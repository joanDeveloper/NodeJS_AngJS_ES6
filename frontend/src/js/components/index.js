import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import MyHero from './Hero/hero.component';
componentsModule.component('myHero', MyHero);

import MyTest from './Test/test.component';
componentsModule.component('myTest', MyTest);

import MyCard from "./Card/card.componet";
componentsModule.component("myCard", MyCard);

import MyPage from "./Page/page.component";
componentsModule.component("myPage", MyPage);



import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

import ArticlePreview from './article-helpers/article-preview.component';
componentsModule.component('articlePreview', ArticlePreview);

import ArticleList from './article-helpers/article-list.component';
componentsModule.component('articleList', ArticleList);

import ListPagination from './article-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);

export default componentsModule;
