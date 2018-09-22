class FollowBtnCtrl {
  constructor( $state) {
    'ngInject';

    

    this._$state = $state;
    console.log(this._$state)
  }


}

let FollowBtn= {
  bindings: {
    user: '=',
    u: '@'
  },
  controller: FollowBtnCtrl,
  templateUrl: 'components/buttons/follow-btn.html'
};

export default FollowBtn;
