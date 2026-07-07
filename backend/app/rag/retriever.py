from __future__ import annotations


class Retriever:
    def __init__(self, vector_store):
        self.vector_store = vector_store

    def retrieve(self, query: str, user_id: int | None = None, top_k: int = 5):
        return self.vector_store.search(query, user_id=user_id, top_k=top_k)
