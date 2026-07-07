from __future__ import annotations

from .embeddings import EmbeddingsHandler
from .llm import llm_handler
from .loader import DocumentLoader
from .retriever import Retriever
from .text_splitter import TextSplitter
from .vector_store import VectorStore


class RAGPipeline:
    def __init__(self):
        self.loader = DocumentLoader()
        self.splitter = TextSplitter()
        self.embeddings = EmbeddingsHandler()
        self.vector_store = VectorStore(self.embeddings)
        self.retriever = Retriever(self.vector_store)

    def query(self, question: str, user_id: int | None = None, top_k: int = 5):
        documents = self.retriever.retrieve(question, user_id=user_id, top_k=top_k)
        context = "\n\n".join(getattr(document, "page_content", "") for document in documents)
        answer = llm_handler.generate_response(context, question)
        sources = []
        for document in documents:
            metadata = getattr(document, "metadata", {})
            sources.append({"file_name": metadata.get("source", "unknown"), "content": getattr(document, "page_content", "")[:200]})
        return {"answer": answer, "sources": sources}


rag_pipeline = RAGPipeline()
