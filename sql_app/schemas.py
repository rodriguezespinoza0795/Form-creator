from typing import List, Optional

from pydantic import BaseModel


# Base information for Users Get/Post
class UserBase(BaseModel):
    email: str

# Base information for InputType Get/Post
class InputTypeBase(BaseModel):
    name : str
    type : str
    tag : str
    description : Optional[str] = None
    is_active : bool

# Base information for Item Get/Post
class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None

# Extra information for InputType Get
class InputType(InputTypeBase):
    id: int

    class Config:
        orm_mode = True

##  Extra information for Item Get
class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

# Extra information for User Get
class User(UserBase):
    id: int
    is_active: bool
    items: List[Item] = []

    class Config:
        orm_mode = True

class InputTypeCreate(InputTypeBase):
    pass

class ItemCreate(ItemBase):
    pass

class UserCreate(UserBase):
    password: str
