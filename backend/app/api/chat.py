from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..dependencies import get_current_user
from ..schemas.chat_schema import ChatRequest, ChatResponse
from ..services.chat_service import ChatService

router = APIRouter()


@router.post("/query", response_model=ChatResponse)
def query_chat(payload: ChatRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
	return ChatService(db).answer_question(payload.question, current_user.id)
