from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_scheduling():
    return {'status': 'ok', 'component': 'scheduling'}
