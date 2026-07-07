from __future__ import annotations


class TextSplitter:
    def split_documents(self, documents):
        chunks = []
        for document in documents:
            text = getattr(document, "page_content", "")
            if text:
                chunks.append(document)
        return chunks
