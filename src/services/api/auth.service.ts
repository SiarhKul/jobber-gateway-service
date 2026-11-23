import { AxiosService } from '../axios';
import { config } from '@gateway/config';
import { AxiosResponse } from 'axios';

export let axiosAuthInstance: AxiosService['axios'];

class AuthService {
  public axiosService: AxiosService;

  constructor() {
    this.axiosService = new AxiosService(`${config.AUTH_BASE_URL ?? ''}/api/v1/auth`, 'auth');
    axiosAuthInstance = this.axiosService.axios;
  }

  public async getCurrentUser(): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.get('/currentuser');
    return response;
  }

  public async getRefreshToken(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.get(`/refresh-token/${username}`);
    return response;
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.put('/change-password', {
      currentPassword,
      newPassword
    });
    return response;
  }

  public async signUp(body: object): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.post('/signup', body);
    return response;
  }

  public async signIn(body: object): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.post('/signin', body);
    return response;
  }

  public async resendEmail(body: object): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.post('/resend-email', body);
    return response;
  }

  public async forgotPassword(email: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.put('/forgot-password', { email });
    return response;
  }

  public async resetPassword(
    token: string,
    password: string,
    confirmPassword: string
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.put(`/reset-password/${token}`, {
      password,
      confirmPassword
    });
    return response;
  }

  public async getGigs(
    query: string,
    from: string,
    size: string,
    type: string
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.get(
      `/search/gigs/${from}/${size}/${type}?${query}`
    );
    return response;
  }

  public async getGigById(gigId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.get(`/search/gig/${gigId}`);
    return response;
  }

  public async seed(count: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.get(`/seed/${count}`);
    return response;
  }
}

export const authService: AuthService = new AuthService();
