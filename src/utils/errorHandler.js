import { toast } from 'react-hot-toast';

export const handleApiError = (error, navigate) => {
  console.error('API Error:', error);

  if (!error.response) {
    // Network error
    navigate('/error/network');
    return;
  }

  const status = error.response.status;

  switch (status) {
    case 400:
      toast.error('Invalid request. Please check your input.');
      break;
    case 401:
      toast.error('Please log in to continue.');
      navigate('/login');
      break;
    case 403:
      navigate('/error/403');
      break;
    case 404:
      navigate('/error/404');
      break;
    case 408:
      navigate('/error/408');
      break;
    case 429:
      navigate('/error/429');
      break;
    case 500:
      navigate('/error/500');
      break;
    case 502:
    case 503:
    case 504:
      navigate('/error/unavailable');
      break;
    default:
      toast.error('Something went wrong. Please try again.');
  }
};

export const handleNetworkError = (navigate) => {
  if (!navigator.onLine) {
    navigate('/error/network');
  }
};