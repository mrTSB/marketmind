'use client';

import { useState, useEffect, useContext } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { LoadingModal } from './LoadingModal';
import { analyzeHeatmap } from '@/app/communicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Info, Upload, Image as ImageIcon, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ContentIdContext } from '@/app/providers/content_id_provider';

// Define the Persona interface based on the Persona component
interface Persona {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string;
  age: number;
  occupation: string;
  income_level: string;
  interests: string[];
  pain_points: string[];
  goals: string[];
  preferred_channels: string[];
  buying_behavior: string;
  brand_preferences: string[];
  chat_system_prompt: string;
  messages: Array<{ role: string; content: string }>;
}

export function HeatmapAnalysis() {
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;

  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedPersona, setSelectedPersona] = useState<string>('');
  const [heatmapResult, setHeatmapResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Debug selected persona changes
  useEffect(() => {
    console.log('Selected persona changed:', selectedPersona);
  }, [selectedPersona]);

  // Debug personas changes
  useEffect(() => {
    console.log('Personas loaded:', personas.length);
    personas.forEach(p => console.log(`Persona: ${p.name}, ID: ${p.id}`));
  }, [personas]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisComplete(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !selectedPersona) return;

    setIsLoading(true);
    setError('');
    try {
      // Get the selected persona object
      const persona = personas.find(p => p.id === selectedPersona);
      if (!persona) {
        throw new Error('Selected persona not found');
      }
      
      // Use the system prompt as the description
      const description = `Analyze how this persona would view this image: ${persona.chat_system_prompt}`;
      
      console.log('Sending request with:', {
        imageUrlLength: imagePreview.length,
        description,
        persona: persona.name
      });

      const result = await analyzeHeatmap(imagePreview, description);
      console.log('Received response:', {
        hasBase64: !!result.base64_heatmap,
        base64Length: result.base64_heatmap?.length
      });

      if (!result.base64_heatmap) {
        throw new Error('No heatmap data received from server');
      }

      setHeatmapResult(result.base64_heatmap);
      setAnalysisComplete(true);
      setActiveTab('results');
    } catch (error: any) {
      console.error('Error analyzing image:', error);
      if (error.code === 'ERR_NETWORK') {
        setError('Could not connect to the server. Please make sure the backend server is running on port 8000.');
      } else {
        setError(error.response?.data?.detail || error.message || 'Failed to analyze image. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadPersonas = async () => {
    if (!contentId) return;
      
    try {
      const response = await fetch(`/api/load-content?contentId=${contentId}&contentType=personas`);
      if (!response.ok) {
        throw new Error('Failed to load personas');
      }
      const data = await response.json();
      // Make sure each persona has a unique id
      const personasWithIds = data.personas.map((persona: any, index: number) => ({
        ...persona,
        id: persona.id || `persona-${index}` // Ensure each persona has a unique id
      }));
      setPersonas(personasWithIds);
    } catch (error) {
      console.error('Error loading personas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPersonas();
  }, [contentId]);

  const getSelectedPersona = () => {
    const persona = personas.find(p => p.id === selectedPersona);
    if (!persona) {
      // Return a default persona if none is selected
      return {
        id: '',
        name: 'No persona selected',
        description: 'Please select a persona',
        icon: '👤',
        image_url: '/placeholder-avatar.png',
        age: 0,
        occupation: '',
        income_level: '',
        interests: [],
        pain_points: [],
        goals: [],
        preferred_channels: [],
        buying_behavior: '',
        brand_preferences: [],
        chat_system_prompt: '',
        messages: []
      };
    }
    return persona;
  };

  const handlePersonaSelect = (personaId: string) => {
    console.log('Selecting persona:', personaId);
    console.log('Current selected persona:', selectedPersona);
    
    // Clear any previous selection
    setSelectedPersona(personaId);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="shadow-lg">
        <CardHeader className="">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">Heatmap Analysis</CardTitle>
          </div>
          <CardDescription className="text-base">
            Upload an image and select a persona to analyze how they would view it
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2" disabled={!analysisComplete}>
                <ImageIcon className="h-4 w-4" />
                <span>Analysis Results</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="upload" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Step 1: Upload Image
                  </h3>
                  
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                    {imagePreview ? (
                      <div className="relative w-full">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full h-auto rounded-lg mx-auto"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview('');
                            setHeatmapResult('');
                            setAnalysisComplete(false);
                          }}
                        >
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-primary/50 mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop your image here, or click to browse
                        </p>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('image')?.click()}
                        >
                          Select Image
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Step 2: Select Persona
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {personas.map((persona) => (
                      <div 
                        key={persona.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          selectedPersona === persona.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handlePersonaSelect(persona.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src={persona.image_url} 
                              alt={persona.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{persona.name}</div>
                            <div className="text-xs text-muted-foreground">{persona.description}</div>
                          </div>
                          {selectedPersona === persona.id && (
                            <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    About Heatmap Analysis
                  </h3>
                  
                  <Card className="bg-muted/30">
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Heatmap analysis uses AI to visualize how different personas might focus on different areas of an image. This helps understand user attention patterns and optimize visual content for specific audiences.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary mt-1">1</div>
                          <div>
                            <p className="text-sm font-medium">Upload your image</p>
                            <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary mt-1">2</div>
                          <div>
                            <p className="text-sm font-medium">Select a persona</p>
                            <p className="text-xs text-muted-foreground">Choose the demographic you want to analyze</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary mt-1">3</div>
                          <div>
                            <p className="text-sm font-medium">View the heatmap</p>
                            <p className="text-xs text-muted-foreground">Red areas indicate highest attention, blue areas lowest</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="pt-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!selectedImage || !selectedPersona}
                    className="w-full py-6 text-lg"
                    size="lg"
                  >
                    {isLoading ? 'Analyzing...' : 'Generate Heatmap Analysis'}
                  </Button>
                  
                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="p-6">
            {heatmapResult ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Analysis Results</h3>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="relative w-4 h-4 rounded-full overflow-hidden mr-1">
                      <img 
                        src={getSelectedPersona().image_url} 
                        alt={getSelectedPersona().name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {getSelectedPersona().name}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Original Image</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Original"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Attention Heatmap</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={`data:image/png;base64,${heatmapResult}`}
                        alt="Heatmap"
                        className="w-full h-auto scale-y-[-1]"
                      />
                    </div>
                  </div>
                </div>
                
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Interpretation</CardTitle>
                    <CardDescription>
                      How {getSelectedPersona().name} might view this image
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">H</div>
                        <div>
                          <p className="font-medium">High Attention Areas</p>
                          <p className="text-sm text-muted-foreground">
                            These red areas are where {getSelectedPersona().name.toLowerCase()} are most likely to focus their attention first.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">M</div>
                        <div>
                          <p className="font-medium">Medium Attention Areas</p>
                          <p className="text-sm text-muted-foreground">
                            Yellow areas indicate secondary points of interest that may be noticed after the primary elements.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">L</div>
                        <div>
                          <p className="font-medium">Low Attention Areas</p>
                          <p className="text-sm text-muted-foreground">
                            Green areas are likely to receive minimal attention from this persona.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab('upload')}>
                      Back to Upload
                    </Button>
                    <Button onClick={handleAnalyze}>
                      Reanalyze
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Persona Profile</CardTitle>
                    <CardDescription>
                      Details about {getSelectedPersona().name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={getSelectedPersona().image_url} 
                          alt={getSelectedPersona().name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-medium">{getSelectedPersona().name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {getSelectedPersona().age} years old • {getSelectedPersona().occupation} • {getSelectedPersona().income_level}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {getSelectedPersona().interests.slice(0, 4).map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {getSelectedPersona().interests.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{getSelectedPersona().interests.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Pain Points</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {getSelectedPersona().pain_points.slice(0, 3).map((point) => (
                            <li key={point} className="flex items-start gap-1">
                              <span className="text-red-500">•</span> {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Goals</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {getSelectedPersona().goals.slice(0, 3).map((goal) => (
                            <li key={goal} className="flex items-start gap-1">
                              <span className="text-green-500">•</span> {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No analysis results yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload an image and select a persona to generate a heatmap analysis
                </p>
                <Button onClick={() => setActiveTab('upload')}>
                  Go to Upload
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      <LoadingModal isOpen={isLoading} message="Analyzing image..." />
    </div>
  );
} 