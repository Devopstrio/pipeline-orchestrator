from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/create')
def create_pipeline(data: dict = Body(...)):
    return {'status': 'created', 'id': 'pipe-123'}
