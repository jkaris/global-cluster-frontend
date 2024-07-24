import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { refreshTokenAction, selectAccessToken, selectRefreshToken } from "../../features/auth/authSlice";

export const useTokens = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = useSelector(selectRefreshToken);
  const accessToken = useSelector(selectAccessToken);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/api/v1/token/refresh', {
        token_refresh: refreshToken,
      });
      const newAccessToken = response.data.access;
      dispatch(refreshTokenAction({ access: newAccessToken }));
      return newAccessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      navigate('/login');
      throw error;
    }
  };

  return { accessToken,refreshAccessToken };
};
