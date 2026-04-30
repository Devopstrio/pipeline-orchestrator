from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_artifacts():
    return {'status': 'ok', 'component': 'artifacts'}
