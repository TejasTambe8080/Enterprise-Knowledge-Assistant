from __future__ import annotations

from pathlib import Path


class DocumentLoader:
    def load_document(self, file_path: str):
        path = Path(file_path)
        if not path.exists():
            return []
        return [type("Doc", (), {"page_content": path.read_text(encoding="utf-8", errors="ignore"), "metadata": {"source": path.name}})()]
