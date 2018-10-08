class FollowBtnCtrl {
  constructor( $state) {
    'ngInject';
    /* $ctrl.css = {
      "background-color": "blue",
      "color": "black"
    } */
    

    this._$state = $state;
    
  }


}

let FollowBtn= {
  bindings: {
    user: '=',
    u: '@',
    css:'='
  },
  controller: FollowBtnCtrl,
  templateUrl: 'components/buttons/follow-btn.html'
};

export default FollowBtn;
