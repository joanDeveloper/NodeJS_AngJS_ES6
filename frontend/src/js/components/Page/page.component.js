class PageCtrl {
    constructor($state) {
        'ngInject';
        this._$state = $state;
        console.log("info:*****************",this.info)
    }
}

let pageComponent = {
  bindings: {
    info: "="
  },
  controller: PageCtrl,
  templateUrl: "components/Page/page.html"
};

export default pageComponent;
