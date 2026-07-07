# Enterprise Knowledge Assistant

Scaffold for a FastAPI backend and React frontend for enterprise document chat and retrieval.

## Local Setup on Windows

Open PowerShell in the repository root and run:

```powershell
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Use the backend requirements file only. The app code in this workspace does not require the large optional RAG packages such as `chromadb`, `faiss-cpu`, or `langchain`, so installing them will only slow setup down on Windows.

Then start the backend:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

For the frontend:

```powershell
cd ..\frontend
npm install
npm run dev
```
