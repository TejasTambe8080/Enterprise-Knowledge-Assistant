from __future__ import annotations


class EmbeddingsHandler:
    def embed_text(self, text: str):
        return [float(len(text))]
