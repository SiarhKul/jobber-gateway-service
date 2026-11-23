import { AxiosService } from '../axios';
import { config } from '@gateway/config';

export let axiosAuthInstance: AxiosService['axios'];

class AuthService {
  public axiosService: AxiosService;

  constructor() {
    this.axiosService = new AxiosService(
      `${config.AUTH_BASE_URL ?? ''}/api/v1/auth`,
      'auth'
    );
    axiosAuthInstance = this.axiosService.axios;
  }
}

export const authService: AuthService = new AuthService();