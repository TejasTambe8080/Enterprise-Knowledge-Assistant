from __future__ import annotations


class LLMHandler:
    def generate_response(self, context: str, question: str) -> str:
        if not context.strip():
            return "I don't have enough information to answer this question."
        return f"Based on the uploaded document(s), here is a concise answer to: {question}"


llm_handler = LLMHandler()
