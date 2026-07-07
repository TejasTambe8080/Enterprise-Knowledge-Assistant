from __future__ import annotations


class VectorStore:
    def __init__(self, embeddings=None):
        self.embeddings = embeddings
        self._documents = []

    def add_documents(self, documents, user_id: int):
        ids = []
        for index, document in enumerate(documents, start=1):
            ids.append(f"{user_id}-{index}")
            self._documents.append(document)
        return ids

    def search(self, query: str, user_id: int | None = None, top_k: int = 5):
        return self._documents[:top_k]
