import os
import json
from pathlib import Path
from typing import Any, Dict, List, Optional, Union

class JsonDB:
    def __init__(self, db_name: str):
        self.db_name = db_name
        self.data_dir = Path(".data")
        self.data_dir.mkdir(exist_ok=True)
        self.db_file = self.data_dir / f"{db_name}.json"
        self._ensure_db_exists()
    
    def _ensure_db_exists(self) -> None:
        """Ensure the database file exists, create it if it doesn't."""
        if not self.db_file.exists():
            self._write_data({})
    
    def _read_data(self) -> Dict:
        """Read data from the database file."""
        try:
            with open(self.db_file, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return {}
    
    def _write_data(self, data: Dict) -> None:
        """Write data to the database file."""
        with open(self.db_file, 'w') as f:
            json.dump(data, f, indent=2)
    
    def create(self, key: str, value: Any) -> bool:
        """Create a new entry in the database."""
        data = self._read_data()
        if key in data:
            return False
        data[key] = value
        self._write_data(data)
        return True
    
    def read(self, key: str) -> Optional[Any]:
        """Read an entry from the database."""
        data = self._read_data()
        return data.get(key)
    
    def update(self, key: str, value: Any) -> bool:
        """Update an entry in the database."""
        data = self._read_data()
        if key not in data:
            return False
        data[key] = value
        self._write_data(data)
        return True
    
    def delete(self, key: str) -> bool:
        """Delete an entry from the database."""
        data = self._read_data()
        if key not in data:
            return False
        del data[key]
        self._write_data(data)
        return True
    
    def list_all(self) -> Dict:
        """List all entries in the database."""
        return self._read_data()
    
    def clear(self) -> None:
        """Clear all entries in the database."""
        self._write_data({})
