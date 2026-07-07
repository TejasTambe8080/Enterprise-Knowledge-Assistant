from __future__ import annotations

from ..rag.rag_pipeline import rag_pipeline


class ChatService:
    def __init__(self, db):
        self.db = db

    def answer_question(self, question: str, user_id: int):
        result = rag_pipeline.query(question, user_id=user_id)
        return result
