
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotos } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import { showEmptyInputToast, showErrorToast, messageOnLastPage, messageTotalResult } from './js/messages';

const gallery = document.querySelector('.js-gallery ');
const form = document.querySelector('.js-search-form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.js-load-more');

let searchQuery;
let page;
let maxPage;
let perPage = 15;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();
  page = 1;
  searchQuery = e.currentTarget.elements['user-search-query'].value.trim();
  gallery.innerHTML = '';

  if (!searchQuery) {
    showEmptyInputToast();
    hideLoader();
    return;
  }

  try {
    const data = await getPhotos(searchQuery, page);
    if (data.hits.length === 0) return showErrorToast();

    gallery.innerHTML = createMarkup(data.hits);
    messageTotalResult(data.total);
    refreshLightbox();
   

    if (data.total < perPage) {
      loadMoreBtnHide();
    } else {
      loadMoreBtnShow();
    }
  } catch (error) {
  } finally {
    hideLoader();
  }
  e.target.reset();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function refreshLightbox() {
  lightbox.refresh();
}

async function onBtnClick() {
  page += 1;
  showLoader();

  try {
    const data = await getPhotos(searchQuery, page, perPage);
    maxPage = Math.ceil(data.total / perPage);
    const markup = createMarkup(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    refreshLightbox();
   

    if (maxPage === page) {
      loadMoreBtnHide();
      messageOnLastPage();
    }
  } catch {
    showError('Error');
  } finally {
    hideLoader();
  }
  scroll();
}

function scroll() {
  const cardElem = gallery.querySelector('.gallery-item')
  const height = cardElem.getBoundingClientRect().height;
  scrollBy({
    behavior: 'smooth',
    top: height,
  });
}

function showLoader() {
  return loader.classList.remove('is-hidden');
}

function hideLoader() {
  return loader.classList.add('is-hidden');
}

function loadMoreBtnShow() {
  loadMoreBtn.classList.remove('is-hidden');
}

function loadMoreBtnHide() {
  loadMoreBtn.classList.add('is-hidden');
}

