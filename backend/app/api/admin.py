from fastapi import APIRouter, Depends

from ..dependencies import get_current_user

router = APIRouter()


@router.get("/stats")
def stats(current_user=Depends(get_current_user)):
	return {"message": "Admin stats are not implemented yet", "user": current_user.email}
