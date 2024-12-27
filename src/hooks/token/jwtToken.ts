// 헤더에 Jwt 토큰이 있는지 확인
export default function setJwtToken(res: any) {
    const tokenWithBearer = res.headers["authorization"];
    if(!tokenWithBearer) return;
    localStorage.setItem("accessToken", tokenWithBearer);
}