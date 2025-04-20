// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     console.log('Group chat request body:', body);
    
//     const response = await fetch('http://localhost:8000/group-chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Backend error response:', {
//         status: response.status,
//         statusText: response.statusText,
//         body: errorText
//       });
//       throw new Error(`Backend responded with status: ${response.status}. ${errorText}`);
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error in group chat proxy:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to process group chat request',
//         details: error instanceof Error ? error.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// } 