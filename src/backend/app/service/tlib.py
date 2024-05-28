from datetime import UTC, datetime

from domain.settings import (
    ACCESS_EXPIRES_TIME,
    ALGORITHM,
    REFRESH_EXPIRES_TIME,
    SECRET_KEY,
)
from domain.structures import ResultData
from jose import ExpiredSignatureError, JWTError, jwt
from jose.exceptions import JWTClaimsError
from passlib.context import CryptContext

from app.schemas.auth import TokenPair, TokenPayload


class TLib:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    access_type = "access"
    refresh_type = "refresh"

    def __create_access_token(self, data: dict):
        expire = datetime.now(UTC) + ACCESS_EXPIRES_TIME
        data.update({"exp": expire})
        data.update({"type": self.access_type})
        return jwt.encode(data, SECRET_KEY, ALGORITHM)

    def __create_refresh_token(self, data: dict):
        expire = datetime.now(UTC) + REFRESH_EXPIRES_TIME
        data.update({"exp": expire})
        data.update({"type": self.refresh_type})
        return jwt.encode(data, SECRET_KEY, ALGORITHM)

    def verify_password(self, plain_password: str, user_password: str) -> bool:
        return self.pwd_context.verify(plain_password, user_password)

    def create_password_hash(self, password: str) -> str:
        return self.pwd_context.hash(password)

    def decode_token(self, token: str):
        result = ResultData[dict[str | str]]()

        try:
            result.set_result(jwt.decode(token, SECRET_KEY, ALGORITHM))
        except JWTClaimsError:
            result.set_error(401, "Any claim is invalid in any way.")
        except ExpiredSignatureError:
            result.set_error(401, "The signature has expired.")
        except JWTError:
            result.set_error(401, "The signature is invalid in any way.")
        finally:
            return result

    def create_token_pair(self, data: TokenPayload):
        return TokenPair(
            access=self.__create_access_token(data),
            refresh=self.__create_refresh_token(data),
        )
