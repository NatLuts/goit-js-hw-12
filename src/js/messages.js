import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showEmptyInputToast() {
    return iziToast.error({
      title: '',
      backgroundColor: '#c55f5f',
      titleColor: '#fff',
      messageColor: '#fff',
      message: 'Please write your request',
      color: '#fff',
      position: 'topRight',
      progressBarColor: '#B51B1B',
    });
  }
  
  export function showErrorToast() {
    return iziToast.error({
      title: '',
      backgroundColor: '#EF4040',
      titleColor: '#fff',
      messageColor: '#fff',
      message:
        'Sorry, there are no images matching <br/> your search query. Please, try again!',
      color: '#fff',
      position: 'topRight',
      progressBarColor: '#B51B1B',
    });
  }
  
  export function messageOnLastPage() {
    return iziToast.warning({
    message: `We're sorry, but you've reached the end of search results`,
    backgroundColor: 'rgb(255, 160, 0)',
    color: '#fff',
    position: 'topRight',
    })
    
  }
  
  export function messageTotalResult(total) {
    return iziToast.success({
      message: `We found ${total} photos`,
      backgroundColor: 'rgb(89, 161, 13)',
      color: '#fff',
      position: 'topRight',
      })
    
  }
  