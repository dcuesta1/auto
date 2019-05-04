(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_directives/outsideClick.directive.ts":
/*!*******************************************************!*\
  !*** ./src/app/_directives/outsideClick.directive.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var OutsideClickDirective = /** @class */ (function () {
    function OutsideClickDirective(elementRef) {
        this.elementRef = elementRef;
        this.outsideClick = new core_1.EventEmitter();
    }
    OutsideClickDirective.prototype.onMouseEnter = function (targetElement) {
        var clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.outsideClick.emit(null);
        }
    };
    __decorate([
        core_1.Output('outsideClick'),
        __metadata("design:type", core_1.EventEmitter)
    ], OutsideClickDirective.prototype, "outsideClick", void 0);
    __decorate([
        core_1.HostListener('document:click', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], OutsideClickDirective.prototype, "onMouseEnter", null);
    OutsideClickDirective = __decorate([
        core_1.Directive({
            selector: '[appOutsideClick]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], OutsideClickDirective);
    return OutsideClickDirective;
}());
exports.OutsideClickDirective = OutsideClickDirective;


/***/ }),

/***/ "./src/app/_etc/AuthInterceptor.ts":
/*!*****************************************!*\
  !*** ./src/app/_etc/AuthInterceptor.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var environment_1 = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var app_service_1 = __webpack_require__(/*! ../_services/app.service */ "./src/app/_services/app.service.ts");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(local, router) {
        this.local = local;
        this.router = router;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var token = this.local.getAuthToken();
        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', token) });
        }
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        req = req.clone({ url: environment_1.environment.apiUrl + req.url });
        return next.handle(req).pipe(operators_1.tap(function (event) {
            if (event instanceof http_1.HttpResponse) {
                token = event.headers.get('token');
                if (token) {
                    _this.local.setAuthToken(token);
                }
            }
        }, function (err) {
            var errMsg;
            if (err instanceof http_1.HttpErrorResponse) {
                if (err.status === 401) {
                    _this.local.clear();
                    _this.router.navigate(['/login']);
                }
                else {
                    var error = err.message || JSON.stringify(err.error);
                    errMsg = err.status + " - " + (err.statusText || '') + " Details: " + err;
                }
            }
            else {
                errMsg = err.message ? err.message : err.toString();
            }
            return rxjs_1.throwError(errMsg);
        }));
    };
    AuthInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService,
            router_1.Router])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
exports.AuthInterceptorProvider = {
    provide: http_1.HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};


/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var app_service_1 = __webpack_require__(/*! ../_services/app.service */ "./src/app/_services/app.service.ts");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(appService, router) {
        this.appService = appService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this.appService.getCurrentUser()) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService,
            router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ "./src/app/_layout/auth.component.ts":
/*!*******************************************!*\
  !*** ./src/app/_layout/auth.component.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var AuthComponent = /** @class */ (function () {
    function AuthComponent() {
    }
    AuthComponent.prototype.ngOnInit = function () { };
    AuthComponent = __decorate([
        core_1.Component({
            selector: 'app-auth',
            template: "\n    <div class=\"wrapper auth\">\n      <div id=\"main\">\n        <main class=\"content\">\n          <router-outlet></router-outlet>\n        </main>\n      </div>\n    </div>\n  "
        })
    ], AuthComponent);
    return AuthComponent;
}());
exports.AuthComponent = AuthComponent;


/***/ }),

/***/ "./src/app/_layout/index.component.ts":
/*!********************************************!*\
  !*** ./src/app/_layout/index.component.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var app_service_1 = __webpack_require__(/*! ../_services/app.service */ "./src/app/_services/app.service.ts");
var IndexComponent = /** @class */ (function () {
    function IndexComponent(_appService, _router) {
        var _this = this;
        this._appService = _appService;
        this._router = _router;
        this.isLoading = true;
        _router.events.forEach(function (event) {
            if (event instanceof router_1.NavigationStart) {
                _appService.toggleLoading(true);
            }
        });
        _appService.loader.subscribe(function (isLoading) {
            _this.isLoading = isLoading;
        });
    }
    IndexComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.HostBinding(),
        __metadata("design:type", Object)
    ], IndexComponent.prototype, "isLoading", void 0);
    IndexComponent = __decorate([
        core_1.Component({
            selector: 'app-index',
            template: "\n    <div class=\"wrapper\">\n      <app-sidebar></app-sidebar>\n      <div id=\"main\">\n        <app-topbar></app-topbar>\n        <div class=\"content-wrapper\">\n          <div *ngIf=\"isLoading\" id=\"loading\">\n            <div class=\"spinner\">\n              <div class=\"dot1\"></div>\n              <div class=\"dot2\"></div>\n            </div>\n            <div class=\"text-loading\">Loading..</div>\n          </div>\n          <main class=\"content\">\n            <div class=\"container-fluid\">\n              <router-outlet></router-outlet>\n            </div>\n          </main>\n        </div>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [app_service_1.AppService,
            router_1.Router])
    ], IndexComponent);
    return IndexComponent;
}());
exports.IndexComponent = IndexComponent;


/***/ }),

/***/ "./src/app/_layout/sidebar/sidebar.component.html":
/*!********************************************************!*\
  !*** ./src/app/_layout/sidebar/sidebar.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-sidebar sidebar\">\n  <a href=\"#\" class=\"sidebar-brand\">\n    <i class=\"fa fa-car\"></i>\n    Autoshop\n  </a>\n  <div class=\"sidebar-content\">\n    <div class=\"sidebar-user\">\n      <img src=\"assets/images/m-avatar.svg\" class=\"img-fluid rounded-circle mb-2\" alt=\"user\">\n      <div class=\"font-weight-bold\">{{ currentUser.name}}</div>\n      <small>ACME Corp.</small>\n    </div>\n    <ul class=\"sidebar-nav\">\n      <li class=\"sidebar-header\">Main</li>\n      <li class=\"sidebar-item\">\n        <a routerLink=\"/\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact:true}\" class=\"sidebar-link\">\n          <span class=\"align-middle\">\n            <i class=\"fa fa-home\"></i>\n            Dashboard\n          </span>\n        </a>\n      </li>\n      <li class=\"sidebar-item\">\n        <a routerLink=\"/invoices\" routerLinkActive=\"active\" class=\"sidebar-link\">\n          <span class=\"align-middle\">\n            <i class=\"fa fa-files-o\"></i>\n            Invoices\n          </span>\n<!--          <div class=\"sidebar-badge badge badge-pill badge-primary\">New</div>-->\n        </a>\n      </li>\n      <li class=\"sidebar-item\">\n        <a class=\"sidebar-link\" routerLink=\"/payments\" routerLinkActive=\"active\">\n          <span class=\"align-middle\">\n            <i class=\"fa fa-credit-card-alt\"></i>\n            Payments\n          </span>\n        </a>\n      </li>\n      <li class=\"sidebar-item\">\n        <a routerLink=\"/customers\" routerLinkActive=\"active\" class=\"sidebar-link\">\n          <span class=\"align-middle\">\n            <i class=\"fa fa-address-book\"></i>\n            Customers\n          </span>\n        </a>\n      </li>\n      <li class=\"sidebar-item\">\n        <a routerLink=\"/employees\" routerLinkActive=\"active\" class=\"sidebar-link\">\n          <span class=\"align-middle\">\n            <i class=\"fa  fa-users\"></i>\n            Employees\n          </span>\n        </a>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/_layout/sidebar/sidebar.component.scss":
/*!********************************************************!*\
  !*** ./src/app/_layout/sidebar/sidebar.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-sidebar {\n  min-width: 215px !important;\n  max-width: 215px;\n  transition: margin-left 0.3s ease-in-out, left 0.3s ease-in-out, margin-right 0.3s ease-in-out, right 0.3s ease-in-out;\n  background: transparent;\n  border-right: 0;\n  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.05);\n  z-index: 1;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  /*box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);*/\n}\n\n.sidebar-brand {\n  padding: 1rem;\n  font-size: 1.43rem;\n  font-weight: 600;\n  color: #fff;\n  width: 100%;\n  display: block;\n  text-decoration: none;\n  background: #0b6bd3;\n}\n\n.sidebar-brand i {\n  color: #bbd6f4;\n}\n\n.sidebar-content {\n  background: #fff;\n  transition: margin-left 0.3s ease-in-out, left 0.3s ease-in-out, margin-right 0.3s ease-in-out, right 0.3s ease-in-out;\n  height: 100%;\n  min-height: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n\n.sidebar-user {\n  padding: 1.5rem 1rem 1rem;\n  background: #fff;\n  color: #343a40;\n  text-align: center;\n  text-transform: capitalize;\n}\n\n.sidebar-user img {\n  width: 64px;\n  height: 64px;\n  background: cornflowerblue;\n}\n\n.sidebar-sticky {\n  position: relative;\n  top: 0;\n  height: calc(100vh - 48px);\n  padding-top: 0.5rem;\n  overflow-x: hidden;\n  overflow-y: auto;\n  /* Scrollable contents if viewport is shorter than content. */\n}\n\n@supports ((position: -webkit-sticky) or (position: sticky)) {\n  .sidebar-sticky {\n    position: -webkit-sticky;\n    position: sticky;\n  }\n}\n\n.sidebar-nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n  -ms-flex: 1;\n      flex: 1;\n  background: #fff;\n}\n\n.sidebar .sidebar-item a.active {\n  color: #212529;\n  background: #e9ecef;\n}\n\n.sidebar .sidebar-link {\n  display: block;\n  padding: 0.65rem 0.75rem;\n  margin: 0 0.5rem;\n  color: #6c757d;\n  font-weight: 400;\n  background: transparent;\n  border-radius: 0.2rem;\n  transition: background 0.1s ease-in-out;\n  position: relative;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.sidebar-badge {\n  position: absolute;\n  right: 15px;\n  top: 13px;\n}\n\n.sidebar-header {\n  background: transparent;\n  color: #adb5bd;\n  padding: 0.375rem 1.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2xheW91dC9zaWRlYmFyL0M6XFx4YW1wcFxcaHRkb2NzXFxhdXRvL3NyY1xcYXBwXFxfbGF5b3V0XFxzaWRlYmFyXFxzaWRlYmFyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9fbGF5b3V0L3NpZGViYXIvc2lkZWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDJCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzSEFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLDBDQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxnREFBQTtBQ0NGOztBREVBO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0FDQ0Y7O0FERUE7RUFDRSxjQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLHNIQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsMEJBQUE7TUFBQSxzQkFBQTtBQ0NGOztBREVBO0VBQ0UseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0FDQ0Y7O0FERUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLDBCQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSwwQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUFrQiw2REFBQTtBQ0VwQjs7QURDQTtFQUNFO0lBQ0Usd0JBQUE7SUFDQSxnQkFBQTtFQ0VGO0FBQ0Y7O0FEQ0E7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDBCQUFBO01BQUEsc0JBQUE7RUFDQSxvQkFBQTtNQUFBLDJCQUFBO0VBQ0EsV0FBQTtNQUFBLE9BQUE7RUFDQSxnQkFBQTtBQ0NGOztBREVBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FDQ0Y7O0FERUE7RUFDRSxjQUFBO0VBQ0Esd0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFDQSx1Q0FBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0FDQ0Y7O0FERUE7RUFDRSx1QkFBQTtFQUNBLGNBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL19sYXlvdXQvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFwcC1zaWRlYmFyIHtcbiAgbWluLXdpZHRoOiAyMTVweCAhaW1wb3J0YW50O1xuICBtYXgtd2lkdGg6IDIxNXB4O1xuICB0cmFuc2l0aW9uOiBtYXJnaW4tbGVmdCAuM3MgZWFzZS1pbi1vdXQsbGVmdCAuM3MgZWFzZS1pbi1vdXQsbWFyZ2luLXJpZ2h0IC4zcyBlYXNlLWluLW91dCxyaWdodCAuM3MgZWFzZS1pbi1vdXQ7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IDA7XG4gIGJveC1zaGFkb3c6IDAgMCAycmVtIDAgcmdiYSgwLDAsMCwuMDUpO1xuICB6LWluZGV4OiAxO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICAvKmJveC1zaGFkb3c6IGluc2V0IC0xcHggMCAwIHJnYmEoMCwgMCwgMCwgLjEpOyovXG59XG5cbi5zaWRlYmFyLWJyYW5kIHtcbiAgcGFkZGluZzogMXJlbTtcbiAgZm9udC1zaXplOiAxLjQzcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogI2ZmZjtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJhY2tncm91bmQ6ICMwYjZiZDM7XG59XG5cbi5zaWRlYmFyLWJyYW5kIGkge1xuICBjb2xvcjogI2JiZDZmNFxufVxuXG4uc2lkZWJhci1jb250ZW50IHtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgdHJhbnNpdGlvbjogbWFyZ2luLWxlZnQgLjNzIGVhc2UtaW4tb3V0LGxlZnQgLjNzIGVhc2UtaW4tb3V0LG1hcmdpbi1yaWdodCAuM3MgZWFzZS1pbi1vdXQscmlnaHQgLjNzIGVhc2UtaW4tb3V0O1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5zaWRlYmFyLXVzZXIge1xuICBwYWRkaW5nOiAxLjVyZW0gMXJlbSAxcmVtO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzM0M2E0MDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLnNpZGViYXItdXNlciBpbWcge1xuICB3aWR0aDogNjRweDtcbiAgaGVpZ2h0OiA2NHB4O1xuICBiYWNrZ3JvdW5kOiBjb3JuZmxvd2VyYmx1ZTtcbn1cblxuLnNpZGViYXItc3RpY2t5IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IDA7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDQ4cHgpO1xuICBwYWRkaW5nLXRvcDogLjVyZW07XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogYXV0bzsgLyogU2Nyb2xsYWJsZSBjb250ZW50cyBpZiB2aWV3cG9ydCBpcyBzaG9ydGVyIHRoYW4gY29udGVudC4gKi9cbn1cblxuQHN1cHBvcnRzICgocG9zaXRpb246IC13ZWJraXQtc3RpY2t5KSBvciAocG9zaXRpb246IHN0aWNreSkpIHtcbiAgLnNpZGViYXItc3RpY2t5IHtcbiAgICBwb3NpdGlvbjogLXdlYmtpdC1zdGlja3k7XG4gICAgcG9zaXRpb246IHN0aWNreTtcbiAgfVxufVxuXG4uc2lkZWJhci1uYXYge1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgZmxleDogMTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cblxuLnNpZGViYXIgLnNpZGViYXItaXRlbSBhLmFjdGl2ZSB7XG4gIGNvbG9yOiAjMjEyNTI5O1xuICBiYWNrZ3JvdW5kOiAjZTllY2VmO1xufVxuXG4uc2lkZWJhciAuc2lkZWJhci1saW5rIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IC42NXJlbSAuNzVyZW07XG4gIG1hcmdpbjogMCAuNXJlbTtcbiAgY29sb3I6ICM2Yzc1N2Q7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiAuMnJlbTtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuMXMgZWFzZS1pbi1vdXQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zaWRlYmFyLWJhZGdlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTVweDtcbiAgdG9wOiAxM3B4O1xufVxuXG4uc2lkZWJhci1oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICNhZGI1YmQ7XG4gIHBhZGRpbmc6IC4zNzVyZW0gMS41cmVtO1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuXG4iLCIuYXBwLXNpZGViYXIge1xuICBtaW4td2lkdGg6IDIxNXB4ICFpbXBvcnRhbnQ7XG4gIG1heC13aWR0aDogMjE1cHg7XG4gIHRyYW5zaXRpb246IG1hcmdpbi1sZWZ0IDAuM3MgZWFzZS1pbi1vdXQsIGxlZnQgMC4zcyBlYXNlLWluLW91dCwgbWFyZ2luLXJpZ2h0IDAuM3MgZWFzZS1pbi1vdXQsIHJpZ2h0IDAuM3MgZWFzZS1pbi1vdXQ7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IDA7XG4gIGJveC1zaGFkb3c6IDAgMCAycmVtIDAgcmdiYSgwLCAwLCAwLCAwLjA1KTtcbiAgei1pbmRleDogMTtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgLypib3gtc2hhZG93OiBpbnNldCAtMXB4IDAgMCByZ2JhKDAsIDAsIDAsIC4xKTsqL1xufVxuXG4uc2lkZWJhci1icmFuZCB7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGZvbnQtc2l6ZTogMS40M3JlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICNmZmY7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBiYWNrZ3JvdW5kOiAjMGI2YmQzO1xufVxuXG4uc2lkZWJhci1icmFuZCBpIHtcbiAgY29sb3I6ICNiYmQ2ZjQ7XG59XG5cbi5zaWRlYmFyLWNvbnRlbnQge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICB0cmFuc2l0aW9uOiBtYXJnaW4tbGVmdCAwLjNzIGVhc2UtaW4tb3V0LCBsZWZ0IDAuM3MgZWFzZS1pbi1vdXQsIG1hcmdpbi1yaWdodCAwLjNzIGVhc2UtaW4tb3V0LCByaWdodCAwLjNzIGVhc2UtaW4tb3V0O1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5zaWRlYmFyLXVzZXIge1xuICBwYWRkaW5nOiAxLjVyZW0gMXJlbSAxcmVtO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzM0M2E0MDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLnNpZGViYXItdXNlciBpbWcge1xuICB3aWR0aDogNjRweDtcbiAgaGVpZ2h0OiA2NHB4O1xuICBiYWNrZ3JvdW5kOiBjb3JuZmxvd2VyYmx1ZTtcbn1cblxuLnNpZGViYXItc3RpY2t5IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IDA7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDQ4cHgpO1xuICBwYWRkaW5nLXRvcDogMC41cmVtO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIC8qIFNjcm9sbGFibGUgY29udGVudHMgaWYgdmlld3BvcnQgaXMgc2hvcnRlciB0aGFuIGNvbnRlbnQuICovXG59XG5cbkBzdXBwb3J0cyAocG9zaXRpb246IC13ZWJraXQtc3RpY2t5KSBvciAocG9zaXRpb246IHN0aWNreSkge1xuICAuc2lkZWJhci1zdGlja3kge1xuICAgIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTtcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xuICB9XG59XG4uc2lkZWJhci1uYXYge1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgZmxleDogMTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cblxuLnNpZGViYXIgLnNpZGViYXItaXRlbSBhLmFjdGl2ZSB7XG4gIGNvbG9yOiAjMjEyNTI5O1xuICBiYWNrZ3JvdW5kOiAjZTllY2VmO1xufVxuXG4uc2lkZWJhciAuc2lkZWJhci1saW5rIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDAuNjVyZW0gMC43NXJlbTtcbiAgbWFyZ2luOiAwIDAuNXJlbTtcbiAgY29sb3I6ICM2Yzc1N2Q7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xcyBlYXNlLWluLW91dDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnNpZGViYXItYmFkZ2Uge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxNXB4O1xuICB0b3A6IDEzcHg7XG59XG5cbi5zaWRlYmFyLWhlYWRlciB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogI2FkYjViZDtcbiAgcGFkZGluZzogMC4zNzVyZW0gMS41cmVtO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/_layout/sidebar/sidebar.component.ts":
/*!******************************************************!*\
  !*** ./src/app/_layout/sidebar/sidebar.component.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var app_service_1 = __webpack_require__(/*! ../../_services/app.service */ "./src/app/_services/app.service.ts");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(appService) {
        this.appService = appService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.currentUser = this.appService.getCurrentUser();
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/_layout/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.scss */ "./src/app/_layout/sidebar/sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;


/***/ }),

/***/ "./src/app/_layout/topbar/topbar.component.html":
/*!******************************************************!*\
  !*** ./src/app/_layout/topbar/topbar.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-topbar navbar navbar-expand navbar-dark\">\n  <a href=\"#\" class=\"sidebar-toggle d-flex mr-2\">\n    <i class=\"hamburger align-self-center\"></i>\n  </a>\n  <form class=\"form-inline d-none d-sm-inline-block\">\n    <input type=\"text\" class=\"form-control form-control-lite\" placeholder=\"Search..\">\n  </form>\n  <div class=\"navbar-collapse collapse\">\n    <ul class=\"navbar-nav ml-auto\">\n      <li ngbDropdown [placement]=\"'bottom-right'\" class=\"nav-item dropdown ml-lg-2\">\n        <button ngbDropdownToggle id=\"notificationDropdownButton\" class=\"nav-link btn btn-link dropdown-toggle\">\n          <i class=\"fa fa-bell\"></i>\n        </button>\n        <div ngbDropdownMenu aria-labelledby=\"notificationDropdownButton\" class=\"dropdown-menu dropdown-menu-lg py-0\">\n          <div class=\"dropdown-header\">4 New Notifications</div>\n          <div class=\"list-group\">\n            <a ngbDropdownItem href=\"#\" class=\"list-group-item\">\n              <div class=\"row no-gutters align-items-center\">\n                <div class=\"col-2\">\n                  <svg class=\"svg-inline--fa fa-bell fa-w-14 ml-1 text-danger fa-fw\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"bell\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" data-fa-i2svg=\"\"><path fill=\"currentColor\" d=\"M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z\"></path></svg><!-- <i class=\"ml-1 text-danger fas fa-fw fa-bell\"></i> -->\n                </div>\n                <div class=\"col-10\">\n                  <div class=\"text-dark\">Update completed</div>\n                  <div class=\"text-muted small mt-1\">Restart server 12 to complete the update.</div>\n                  <div class=\"text-muted small mt-1\">2h ago</div>\n                </div>\n              </div>\n            </a>\n            <a ngbDropdownItem href=\"#\" class=\"list-group-item\">\n              <div class=\"row no-gutters align-items-center\">\n                <div class=\"col-2\">\n                  <svg class=\"svg-inline--fa fa-bell fa-w-14 ml-1 text-danger fa-fw\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"bell\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" data-fa-i2svg=\"\"><path fill=\"currentColor\" d=\"M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z\"></path></svg><!-- <i class=\"ml-1 text-danger fas fa-fw fa-bell\"></i> -->\n                </div>\n                <div class=\"col-10\">\n                  <div class=\"text-dark\">Update completed</div>\n                  <div class=\"text-muted small mt-1\">Restart server 12 to complete the update.</div>\n                  <div class=\"text-muted small mt-1\">2h ago</div>\n                </div>\n              </div>\n            </a>\n          </div>\n          <div class=\"dropdown-menu-footer\">\n            <a href=\"#\" class=\"text-muted\">Show all notifications</a>\n          </div>\n        </div>\n      </li>\n      <li ngbDropdown [placement]=\"'bottom-right'\" class=\"nav-item dropdown ml-lg-2\">\n        <button ngbDropdownToggle id=\"configDropdownButton\" class=\"nav-link btn btn-link dropdown-toggle\">\n          <i class=\"fa fa-cog\"></i>\n        </button>\n        <div ngbDropdownMenu class=\"dropdown-menu py-0\">\n          <div class=\"list-group\">\n            <a ngbDropdownItem href=\"#\" class=\"list-group-item\">\n              <svg class=\"svg-inline--fa fa-user fa-w-14 align-middle mr-1 fa-fw\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"user\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" data-fa-i2svg=\"\"><path fill=\"currentColor\" d=\"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z\"></path></svg>\n              Profile\n            </a>\n            <a ngbDropdownItem href=\"#\" class=\"list-group-item\">Settings</a>\n            <div class=\"dropdown-divider\"></div>\n            <button ngbDropdownItem (click)=\"signOut()\" class=\"btn btn-link list-group-item\">Sign out</button>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/_layout/topbar/topbar.component.scss":
/*!******************************************************!*\
  !*** ./src/app/_layout/topbar/topbar.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-topbar {\n  position: relative;\n  padding: 0 1rem;\n}\n\n.sidebar-toggle {\n  cursor: pointer;\n  width: 26px;\n  height: 26px;\n  margin-left: 0.5rem;\n}\n\n.hamburger {\n  position: relative;\n}\n\n.hamburger, .hamburger:before, .hamburger:after {\n  cursor: pointer;\n  height: 2px;\n  width: 20px;\n  background: rgba(255, 255, 255, 0.75);\n  display: block;\n  content: \"\";\n  transition: background 0.1s ease-in-out, color 0.1s ease-in-out;\n}\n\n.hamburger:before {\n  top: -6.5px;\n  width: 20px;\n  position: absolute;\n}\n\n.hamburger:after {\n  bottom: -6.5px;\n  width: 20px;\n  position: absolute;\n}\n\n.form-control {\n  padding: 0.75rem 1rem;\n  border-width: 0;\n  border-radius: 0;\n}\n\n.form-control-lite {\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n  background: transparent;\n  color: #fff;\n}\n\n.form-control-lite::-webkit-input-placeholder {\n  color: rgba(255, 255, 255, 0.75);\n}\n\n.form-control-lite:-ms-input-placeholder {\n  color: rgba(255, 255, 255, 0.75);\n}\n\n.form-control-lite::-ms-input-placeholder {\n  color: rgba(255, 255, 255, 0.75);\n}\n\n.form-control-lite::placeholder {\n  color: rgba(255, 255, 255, 0.75);\n}\n\n.form-control-lite::-webkit-input-placeholder {\n  color: rgba(255, 255, 255, 0.75);\n}\n\n.form-control-lite::-moz-placeholder {\n  color: rgba(255, 255, 255, 0.75);\n}\n\n.form-control-lite::-ms-input-placeholder {\n  color: rgba(255, 255, 255, 0.75);\n}\n\n.form-control-dark {\n  color: #fff;\n  background-color: rgba(255, 255, 255, 0.1);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n\n.form-control-dark:focus {\n  border-color: transparent;\n  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);\n}\n\n.app-topbar .navbar-nav {\n  -ms-flex-direction: row;\n      flex-direction: row;\n  padding: 0 1rem;\n}\n\n.app-topbar .nav-item {\n  line-height: 3rem !important;\n}\n\n.app-topbar .btn {\n  line-height: inherit;\n}\n\n.app-topbar .nav-link {\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 20px;\n}\n\n.app-topbar .dropdown-toggle::after {\n  display: none;\n}\n\n.app-topbar .navbar .nav-item .dropdown-menu {\n  line-height: 1.5;\n}\n\n.dropdown .dropdown-menu.show {\n  -webkit-animation-name: dropdownAnimation;\n  animation-name: dropdownAnimation;\n  -webkit-animation-duration: 0.5s;\n  animation-duration: 0.5s;\n  -webkit-animation-iteration-count: 1;\n  animation-iteration-count: 1;\n  -webkit-animation-timing-function: ease;\n  animation-timing-function: ease;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards;\n}\n\n.dropdown-menu-lg {\n  min-width: 20rem;\n}\n\n.dropdown-header {\n  display: block;\n  padding: 0rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  line-height: 25px;\n  text-align: center;\n  font-weight: 600;\n  color: #6c757d;\n  white-space: nowrap;\n}\n\n.app-topbar .list-group-item {\n  line-height: 1rem;\n}\n\n.app-topbar .list-group-item svg,\n.app-topbar .list-group-item i {\n  height: 20px;\n  font-size: 20px;\n}\n\n.app-topbar .dropdown-menu-footer {\n  padding: 0.5rem;\n  text-align: center;\n  display: block;\n  font-size: 0.75rem;\n  line-height: 2rem;\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2xheW91dC90b3BiYXIvQzpcXHhhbXBwXFxodGRvY3NcXGF1dG8vc3JjXFxhcHBcXF9sYXlvdXRcXHRvcGJhclxcdG9wYmFyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9fbGF5b3V0L3RvcGJhci90b3BiYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FDQ0o7O0FERUE7RUFDSSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLCtEQUFBO0FDQ0o7O0FER0E7RUFDSSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FDQUo7O0FER0E7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FDQUo7O0FER0E7RUFDSSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ0FKOztBREdBO0VBQ0ksU0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7QUNBSjs7QURHQTtFQUNJLGdDQUFBO0FDQUo7O0FEREE7RUFDSSxnQ0FBQTtBQ0FKOztBRERBO0VBQ0ksZ0NBQUE7QUNBSjs7QUREQTtFQUNJLGdDQUFBO0FDQUo7O0FER0E7RUFDSSxnQ0FBQTtBQ0FKOztBREdBO0VBQ0ksZ0NBQUE7QUNBSjs7QURHQTtFQUNJLGdDQUFBO0FDQUo7O0FER0E7RUFDSSxXQUFBO0VBQ0EsMENBQUE7RUFDQSxzQ0FBQTtBQ0FKOztBREdBO0VBQ0kseUJBQUE7RUFDQSwrQ0FBQTtBQ0FKOztBREdBO0VBQ0ksdUJBQUE7TUFBQSxtQkFBQTtFQUNBLGVBQUE7QUNBSjs7QURHQTtFQUNJLDRCQUFBO0FDQUo7O0FER0E7RUFDSSxvQkFBQTtBQ0FKOztBREdBO0VBQ0ksZ0NBQUE7RUFDQSxlQUFBO0FDQUo7O0FER0E7RUFDSSxhQUFBO0FDQUo7O0FER0E7RUFDSSxnQkFBQTtBQ0FKOztBREdBO0VBQ0kseUNBQUE7RUFDQSxpQ0FBQTtFQUNBLGdDQUFBO0VBQ0Esd0JBQUE7RUFDQSxvQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsdUNBQUE7RUFDQSwrQkFBQTtFQUNBLHFDQUFBO0VBQ0EsNkJBQUE7QUNBSjs7QURHQTtFQUNJLGdCQUFBO0FDQUo7O0FER0E7RUFDSSxjQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FDQUo7O0FER0E7RUFDSSxpQkFBQTtBQ0FKOztBREdBOztFQUVJLFlBQUE7RUFDQSxlQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLFVBQUE7QUNBSiIsImZpbGUiOiJzcmMvYXBwL19sYXlvdXQvdG9wYmFyL3RvcGJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hcHAtdG9wYmFyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgcGFkZGluZzogMCAxcmVtO1xufVxuXG4uc2lkZWJhci10b2dnbGUge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB3aWR0aDogMjZweDtcbiAgICBoZWlnaHQ6IDI2cHg7XG4gICAgbWFyZ2luLWxlZnQ6IC41cmVtO1xufVxuXG4uaGFtYnVyZ2VyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5oYW1idXJnZXIsIC5oYW1idXJnZXI6YmVmb3JlLCAuaGFtYnVyZ2VyOmFmdGVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgaGVpZ2h0OiAycHg7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgYmFja2dyb3VuZDogaHNsYSgwLDAlLDEwMCUsLjc1KTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgLjFzIGVhc2UtaW4tb3V0LGNvbG9yIC4xcyBlYXNlLWluLW91dDtcbn1cblxuXG4uaGFtYnVyZ2VyOmJlZm9yZSB7XG4gICAgdG9wOiAtNi41cHg7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4uaGFtYnVyZ2VyOmFmdGVyIHtcbiAgICBib3R0b206IC02LjVweDtcbiAgICB3aWR0aDogMjBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5mb3JtLWNvbnRyb2wge1xuICAgIHBhZGRpbmc6IC43NXJlbSAxcmVtO1xuICAgIGJvcmRlci13aWR0aDogMDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xufVxuXG4uZm9ybS1jb250cm9sLWxpdGUge1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgY29sb3I6ICNmZmY7XG59XG5cbi5mb3JtLWNvbnRyb2wtbGl0ZTo6cGxhY2Vob2xkZXJ7XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43NSlcbn1cblxuLmZvcm0tY29udHJvbC1saXRlOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpO1xufVxuXG4uZm9ybS1jb250cm9sLWxpdGU6Oi1tb3otcGxhY2Vob2xkZXJ7XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43NSk7XG59XG5cbi5mb3JtLWNvbnRyb2wtbGl0ZTo6LW1zLWlucHV0LXBsYWNlaG9sZGVye1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpO1xufVxuXG4uZm9ybS1jb250cm9sLWRhcmsge1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgLjEpO1xuICAgIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuMSk7XG59XG5cbi5mb3JtLWNvbnRyb2wtZGFyazpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAuMjUpO1xufVxuXG4uYXBwLXRvcGJhciAubmF2YmFyLW5hdiB7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBwYWRkaW5nOiAwIDFyZW07XG59XG5cbi5hcHAtdG9wYmFyIC5uYXYtaXRlbXtcbiAgICBsaW5lLWhlaWdodDogM3JlbSAhaW1wb3J0YW50O1xufVxuXG4uYXBwLXRvcGJhciAuYnRuIHtcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbn1cblxuLmFwcC10b3BiYXIgLm5hdi1saW5rIHtcbiAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KTtcbiAgICBmb250LXNpemU6IDIwcHg7XG59XG5cbi5hcHAtdG9wYmFyIC5kcm9wZG93bi10b2dnbGU6OmFmdGVyIHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuXG4uYXBwLXRvcGJhciAubmF2YmFyIC5uYXYtaXRlbSAuZHJvcGRvd24tbWVudSB7XG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLmRyb3Bkb3duIC5kcm9wZG93bi1tZW51LnNob3cge1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IGRyb3Bkb3duQW5pbWF0aW9uO1xuICAgIGFuaW1hdGlvbi1uYW1lOiBkcm9wZG93bkFuaW1hdGlvbjtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogLjVzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogLjVzO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG59XG5cbi5kcm9wZG93bi1tZW51LWxnIHtcbiAgICBtaW4td2lkdGg6IDIwcmVtO1xufVxuXG4uZHJvcGRvd24taGVhZGVyIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwYWRkaW5nOiAwcmVtIDEuNXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgICBsaW5lLWhlaWdodDogMjVweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogIzZjNzU3ZDtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uYXBwLXRvcGJhciAubGlzdC1ncm91cC1pdGVtIHtcbiAgICBsaW5lLWhlaWdodDogMXJlbTtcbn1cblxuLmFwcC10b3BiYXIgLmxpc3QtZ3JvdXAtaXRlbSBzdmcsXG4uYXBwLXRvcGJhciAubGlzdC1ncm91cC1pdGVtIGl7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmFwcC10b3BiYXIgLmRyb3Bkb3duLW1lbnUtZm9vdGVyIHtcbiAgICBwYWRkaW5nOiAuNXJlbTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZm9udC1zaXplOiAuNzVyZW07XG4gICAgbGluZS1oZWlnaHQ6IDJyZW07XG4gICAgcGFkZGluZzogMDtcbn1cbiIsIi5hcHAtdG9wYmFyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAwIDFyZW07XG59XG5cbi5zaWRlYmFyLXRvZ2dsZSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd2lkdGg6IDI2cHg7XG4gIGhlaWdodDogMjZweDtcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbn1cblxuLmhhbWJ1cmdlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmhhbWJ1cmdlciwgLmhhbWJ1cmdlcjpiZWZvcmUsIC5oYW1idXJnZXI6YWZ0ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogMnB4O1xuICB3aWR0aDogMjBweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xcyBlYXNlLWluLW91dCwgY29sb3IgMC4xcyBlYXNlLWluLW91dDtcbn1cblxuLmhhbWJ1cmdlcjpiZWZvcmUge1xuICB0b3A6IC02LjVweDtcbiAgd2lkdGg6IDIwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLmhhbWJ1cmdlcjphZnRlciB7XG4gIGJvdHRvbTogLTYuNXB4O1xuICB3aWR0aDogMjBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4uZm9ybS1jb250cm9sIHtcbiAgcGFkZGluZzogMC43NXJlbSAxcmVtO1xuICBib3JkZXItd2lkdGg6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG59XG5cbi5mb3JtLWNvbnRyb2wtbGl0ZSB7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG4uZm9ybS1jb250cm9sLWxpdGU6OnBsYWNlaG9sZGVyIHtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43NSk7XG59XG5cbi5mb3JtLWNvbnRyb2wtbGl0ZTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpO1xufVxuXG4uZm9ybS1jb250cm9sLWxpdGU6Oi1tb3otcGxhY2Vob2xkZXIge1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KTtcbn1cblxuLmZvcm0tY29udHJvbC1saXRlOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KTtcbn1cblxuLmZvcm0tY29udHJvbC1kYXJrIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG59XG5cbi5mb3JtLWNvbnRyb2wtZGFyazpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xufVxuXG4uYXBwLXRvcGJhciAubmF2YmFyLW5hdiB7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbn1cblxuLmFwcC10b3BiYXIgLm5hdi1pdGVtIHtcbiAgbGluZS1oZWlnaHQ6IDNyZW0gIWltcG9ydGFudDtcbn1cblxuLmFwcC10b3BiYXIgLmJ0biB7XG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xufVxuXG4uYXBwLXRvcGJhciAubmF2LWxpbmsge1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KTtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuXG4uYXBwLXRvcGJhciAuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5hcHAtdG9wYmFyIC5uYXZiYXIgLm5hdi1pdGVtIC5kcm9wZG93bi1tZW51IHtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLmRyb3Bkb3duIC5kcm9wZG93bi1tZW51LnNob3cge1xuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBkcm9wZG93bkFuaW1hdGlvbjtcbiAgYW5pbWF0aW9uLW5hbWU6IGRyb3Bkb3duQW5pbWF0aW9uO1xuICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMC41cztcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xuICAtd2Via2l0LWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XG4gIC13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcbiAgLXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG59XG5cbi5kcm9wZG93bi1tZW51LWxnIHtcbiAgbWluLXdpZHRoOiAyMHJlbTtcbn1cblxuLmRyb3Bkb3duLWhlYWRlciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAwcmVtIDEuNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDI1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICM2Yzc1N2Q7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5hcHAtdG9wYmFyIC5saXN0LWdyb3VwLWl0ZW0ge1xuICBsaW5lLWhlaWdodDogMXJlbTtcbn1cblxuLmFwcC10b3BiYXIgLmxpc3QtZ3JvdXAtaXRlbSBzdmcsXG4uYXBwLXRvcGJhciAubGlzdC1ncm91cC1pdGVtIGkge1xuICBoZWlnaHQ6IDIwcHg7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmFwcC10b3BiYXIgLmRyb3Bkb3duLW1lbnUtZm9vdGVyIHtcbiAgcGFkZGluZzogMC41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/_layout/topbar/topbar.component.ts":
/*!****************************************************!*\
  !*** ./src/app/_layout/topbar/topbar.component.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var app_service_1 = __webpack_require__(/*! ../../_services/app.service */ "./src/app/_services/app.service.ts");
var User_1 = __webpack_require__(/*! ../../_models/User */ "./src/app/_models/User.ts");
var auth_service_1 = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var TopbarComponent = /** @class */ (function () {
    function TopbarComponent(appService, authService, router) {
        this.appService = appService;
        this.authService = authService;
        this.router = router;
    }
    TopbarComponent.prototype.ngOnInit = function () {
        this.currentUser = new User_1.User(this.appService.getCurrentUser());
    };
    TopbarComponent.prototype.signOut = function () {
        var _this = this;
        this.authService.destroy()
            .subscribe(function (data) {
            _this.appService.deleteAuthToken();
            _this.appService.removeCurrentUser();
            _this.router.navigate(['/login']);
        });
    };
    TopbarComponent = __decorate([
        core_1.Component({
            selector: 'app-topbar',
            template: __webpack_require__(/*! ./topbar.component.html */ "./src/app/_layout/topbar/topbar.component.html"),
            styles: [__webpack_require__(/*! ./topbar.component.scss */ "./src/app/_layout/topbar/topbar.component.scss")]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService,
            auth_service_1.AuthService,
            router_1.Router])
    ], TopbarComponent);
    return TopbarComponent;
}());
exports.TopbarComponent = TopbarComponent;


/***/ }),

/***/ "./src/app/_models/BaseModel.ts":
/*!**************************************!*\
  !*** ./src/app/_models/BaseModel.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel = /** @class */ (function () {
    function BaseModel(model, toCamel) {
        if (model === void 0) { model = null; }
        if (toCamel === void 0) { toCamel = false; }
        if (model) {
            for (var _i = 0, _a = Object.keys(model); _i < _a.length; _i++) {
                var key = _a[_i];
                var originalKey = key;
                if (toCamel) {
                    key = this.snakeToCamel(key.toString());
                }
                this[key] = model[originalKey];
            }
        }
    }
    BaseModel.prototype.snakeToCamel = function (s) {
        return s.replace(/([-_][a-z])/ig, function ($1) {
            return $1.toUpperCase()
                .replace('_', '');
        });
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;


/***/ }),

/***/ "./src/app/_models/Customer.ts":
/*!*************************************!*\
  !*** ./src/app/_models/Customer.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = __webpack_require__(/*! ./BaseModel */ "./src/app/_models/BaseModel.ts");
var Vehicle_1 = __webpack_require__(/*! ./Vehicle */ "./src/app/_models/Vehicle.ts");
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer(obj, toCamel) {
        if (obj === void 0) { obj = null; }
        if (toCamel === void 0) { toCamel = false; }
        return _super.call(this, obj, toCamel) || this;
    }
    Object.defineProperty(Customer.prototype, "name", {
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "vehicles", {
        get: function () {
            return this._vehicles;
        },
        set: function (value) {
            var vehiclesArr = [];
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var vehicle = value_1[_i];
                vehiclesArr.push(new Vehicle_1.Vehicle(vehicle, true));
            }
            this._vehicles = vehiclesArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "lastVisit", {
        get: function () {
            return this._lastVisit;
        },
        set: function (value) {
            this._lastVisit = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "createdAt", {
        get: function () {
            return this._createdAt;
        },
        set: function (value) {
            this._createdAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "updatedAt", {
        get: function () {
            return this._updatedAt;
        },
        set: function (value) {
            this._updatedAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    return Customer;
}(BaseModel_1.BaseModel));
exports.Customer = Customer;


/***/ }),

/***/ "./src/app/_models/FeeModel.ts":
/*!*************************************!*\
  !*** ./src/app/_models/FeeModel.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = __webpack_require__(/*! ./BaseModel */ "./src/app/_models/BaseModel.ts");
var Fee = /** @class */ (function (_super) {
    __extends(Fee, _super);
    function Fee(model, toCamel) {
        if (toCamel === void 0) { toCamel = false; }
        return _super.call(this, model, toCamel) || this;
    }
    Object.defineProperty(Fee.prototype, "createdAt", {
        get: function () {
            return this._createdAt;
        },
        set: function (value) {
            this._createdAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fee.prototype, "updatedAt", {
        get: function () {
            return this._updatedAt;
        },
        set: function (value) {
            this._updatedAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    return Fee;
}(BaseModel_1.BaseModel));
exports.Fee = Fee;


/***/ }),

/***/ "./src/app/_models/Invoice.ts":
/*!************************************!*\
  !*** ./src/app/_models/Invoice.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = __webpack_require__(/*! ./BaseModel */ "./src/app/_models/BaseModel.ts");
var Customer_1 = __webpack_require__(/*! ./Customer */ "./src/app/_models/Customer.ts");
var FeeModel_1 = __webpack_require__(/*! ./FeeModel */ "./src/app/_models/FeeModel.ts");
var InvoicePayment_1 = __webpack_require__(/*! ./InvoicePayment */ "./src/app/_models/InvoicePayment.ts");
var Item_1 = __webpack_require__(/*! ./Item */ "./src/app/_models/Item.ts");
var User_1 = __webpack_require__(/*! ./User */ "./src/app/_models/User.ts");
var Vehicle_1 = __webpack_require__(/*! ./Vehicle */ "./src/app/_models/Vehicle.ts");
var Invoice = /** @class */ (function (_super) {
    __extends(Invoice, _super);
    function Invoice(obj, toCamel) {
        if (obj === void 0) { obj = null; }
        if (toCamel === void 0) { toCamel = false; }
        var _this = _super.call(this, obj, toCamel) || this;
        _this.statusNumber = obj.status;
        return _this;
    }
    Object.defineProperty(Invoice.prototype, "createdAt", {
        get: function () {
            return this._createdAt;
        },
        set: function (value) {
            this._createdAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "updatedAt", {
        get: function () {
            return this._updatedAt;
        },
        set: function (value) {
            this._updatedAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "employee", {
        get: function () {
            return this._employee;
        },
        set: function (value) {
            this._employee = new User_1.User(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "customer", {
        get: function () {
            return this._customer;
        },
        set: function (value) {
            this._customer = new Customer_1.Customer(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "fees", {
        get: function () {
            return this._fees;
        },
        set: function (fees) {
            var feeArr = [];
            for (var _i = 0, fees_1 = fees; _i < fees_1.length; _i++) {
                var fee = fees_1[_i];
                feeArr.push(new FeeModel_1.Fee(fee, true));
            }
            this._fees = feeArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "invoicePayments", {
        get: function () {
            return this._invoicePayments;
        },
        set: function (invoicePayments) {
            var invoicePaymentsArr = [];
            for (var _i = 0, invoicePayments_1 = invoicePayments; _i < invoicePayments_1.length; _i++) {
                var invoicePayment = invoicePayments_1[_i];
                invoicePaymentsArr.push(new InvoicePayment_1.InvoicePayment(invoicePayment, true));
            }
            this._invoicePayments = invoicePaymentsArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "vehicle", {
        get: function () {
            return this._vehicle;
        },
        set: function (value) {
            this._vehicle = new Vehicle_1.Vehicle(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (items) {
            var itemsArr = [];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                itemsArr.push(new Item_1.Item(item, true));
            }
            this._items = itemsArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "name", {
        get: function () {
            return this.customer.name;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "date", {
        get: function () {
            return this._createdAt.getDay();
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Invoice.prototype, "status", {
        get: function () {
            var statusText;
            switch (this.statusNumber) {
                case Invoice.PENDING_PAYMENT:
                    statusText = 'pending payment';
                    break;
                case Invoice.ESTIMATE:
                    statusText = 'estimate';
                    break;
                case Invoice.CLOSED:
                    statusText = 'closed';
                    break;
                case Invoice.CANCELLED:
                    statusText = 'cancelled';
                    break;
            }
            return statusText;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Invoice.PENDING_PAYMENT = 1;
    Invoice.ESTIMATE = 2;
    Invoice.CLOSED = 4;
    Invoice.CANCELLED = 8;
    return Invoice;
}(BaseModel_1.BaseModel));
exports.Invoice = Invoice;


/***/ }),

/***/ "./src/app/_models/InvoicePayment.ts":
/*!*******************************************!*\
  !*** ./src/app/_models/InvoicePayment.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = __webpack_require__(/*! ./BaseModel */ "./src/app/_models/BaseModel.ts");
var InvoicePayment = /** @class */ (function (_super) {
    __extends(InvoicePayment, _super);
    function InvoicePayment(model, toCamel) {
        if (toCamel === void 0) { toCamel = false; }
        return _super.call(this, model, toCamel) || this;
    }
    return InvoicePayment;
}(BaseModel_1.BaseModel));
exports.InvoicePayment = InvoicePayment;


/***/ }),

/***/ "./src/app/_models/Item.ts":
/*!*********************************!*\
  !*** ./src/app/_models/Item.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = __webpack_require__(/*! ./BaseModel */ "./src/app/_models/BaseModel.ts");
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(obj, toCamel) {
        if (obj === void 0) { obj = null; }
        if (toCamel === void 0) { toCamel = false; }
        return _super.call(this, obj, toCamel) || this;
    }
    Object.defineProperty(Item.prototype, "createdAt", {
        get: function () {
            return this._createdAt;
        },
        set: function (value) {
            this._createdAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "updatedAt", {
        get: function () {
            return this._updatedAt;
        },
        set: function (value) {
            this._updatedAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    return Item;
}(BaseModel_1.BaseModel));
exports.Item = Item;


/***/ }),

/***/ "./src/app/_models/User.ts":
/*!*********************************!*\
  !*** ./src/app/_models/User.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = __webpack_require__(/*! ./BaseModel */ "./src/app/_models/BaseModel.ts");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(model, toCamel) {
        if (model === void 0) { model = null; }
        if (toCamel === void 0) { toCamel = false; }
        return _super.call(this, model, toCamel) || this;
    }
    Object.defineProperty(User.prototype, "createdAt", {
        get: function () {
            return this._createdAt;
        },
        set: function (value) {
            this._createdAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "updatedAt", {
        get: function () {
            return this._createdAt;
        },
        set: function (value) {
            this._updatedAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    return User;
}(BaseModel_1.BaseModel));
exports.User = User;


/***/ }),

/***/ "./src/app/_models/Vehicle.ts":
/*!************************************!*\
  !*** ./src/app/_models/Vehicle.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = __webpack_require__(/*! ./BaseModel */ "./src/app/_models/BaseModel.ts");
var Vehicle = /** @class */ (function (_super) {
    __extends(Vehicle, _super);
    function Vehicle(obj, toCamel) {
        if (obj === void 0) { obj = null; }
        if (toCamel === void 0) { toCamel = false; }
        return _super.call(this, obj, toCamel) || this;
    }
    Object.defineProperty(Vehicle.prototype, "desc", {
        get: function () {
            return this.year + " " + this.model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vehicle.prototype, "createdAt", {
        get: function () {
            return this._createdAt;
        },
        set: function (value) {
            this._createdAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vehicle.prototype, "updatedAt", {
        get: function () {
            return this._updatedAt;
        },
        set: function (value) {
            this._updatedAt = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    return Vehicle;
}(BaseModel_1.BaseModel));
exports.Vehicle = Vehicle;


/***/ }),

/***/ "./src/app/_services/app.service.ts":
/*!******************************************!*\
  !*** ./src/app/_services/app.service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var User_1 = __webpack_require__(/*! ../_models/User */ "./src/app/_models/User.ts");
var AppService = /** @class */ (function () {
    function AppService() {
        this._isLoading = true;
        this.loader = new core_1.EventEmitter();
    }
    AppService.prototype.getLocationPath = function () {
        return window.location.pathname.substr(1).split('/');
    };
    AppService.prototype.getImpersotedUser = function () {
        return JSON.parse(localStorage.getItem(environment_1.environment.const.impersonate));
    };
    AppService.prototype.setImpersotedUser = function (user) {
        localStorage.setItem(environment_1.environment.const.impersonate, JSON.stringify(user));
    };
    AppService.prototype.getCurrentUser = function (toObj) {
        if (toObj === void 0) { toObj = true; }
        var currentUser = localStorage.getItem(environment_1.environment.const.currentUser);
        return currentUser ? new User_1.User(JSON.parse(currentUser)) : null;
    };
    AppService.prototype.setCurrentUser = function (user) {
        localStorage.setItem(environment_1.environment.const.currentUser, JSON.stringify(user));
    };
    AppService.prototype.removeCurrentUser = function () {
        localStorage.removeItem(environment_1.environment.const.currentUser);
    };
    AppService.prototype.getDeviceId = function () {
        return localStorage.getItem(environment_1.environment.const.deviceId);
    };
    AppService.prototype.setDeviceId = function (deviceId) {
        localStorage.setItem(environment_1.environment.const.deviceId, deviceId);
    };
    AppService.prototype.getAuthToken = function () {
        return localStorage.getItem(environment_1.environment.const.authToken);
    };
    AppService.prototype.setAuthToken = function (authToken) {
        localStorage.setItem(environment_1.environment.const.authToken, authToken);
    };
    AppService.prototype.deleteAuthToken = function () {
        localStorage.removeItem(environment_1.environment.const.authToken);
    };
    AppService.prototype.clear = function () {
        localStorage.clear();
    };
    Object.defineProperty(AppService.prototype, "isloading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    AppService.prototype.toggleLoading = function (val) {
        this._isLoading = val;
        this.loader.emit(this._isLoading);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AppService.prototype, "loader", void 0);
    AppService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;


/***/ }),

/***/ "./src/app/_services/auth.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/auth.service.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app/_services/app.service.ts");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var AuthService = /** @class */ (function () {
    function AuthService(router, http, appService) {
        this.router = router;
        this.http = http;
        this.appService = appService;
    }
    AuthService.prototype.setDevice = function () {
        this.device = this.appService.getDeviceId();
        if (!this.device) {
            this.device = (Math.random() + +new Date()).toString(36).replace('.', '');
            this.appService.setDeviceId(this.device);
        }
    };
    AuthService.prototype.authenticate = function (email, password) {
        this.setDevice();
        var device = this.device;
        return this.http.post('/authenticate', { email: email, password: password, device: device });
    };
    AuthService.prototype.register = function (user) {
        this.setDevice();
        var device = this.device;
        return this.http.post('/register', { user: user, device: device });
    };
    AuthService.prototype.destroy = function () {
        var token = this.appService.getAuthToken();
        return this.http.post('/signout', { token: token });
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            http_1.HttpClient,
            app_service_1.AppService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/_services/customer.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/customer.service.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app/_services/app.service.ts");
var CustomerService = /** @class */ (function () {
    function CustomerService(_http, _appService) {
        this._http = _http;
        this._appService = _appService;
    }
    CustomerService.prototype.companyCustomers = function () {
        // TODO: impersonate route
        var user = this._appService.getCurrentUser();
        return this._http.get('/company/' + user.companyId + '/Customers');
    };
    CustomerService.prototype.create = function (customer) {
        return this._http.post('/Customers', customer);
    };
    CustomerService.prototype.update = function (customer) {
        return this._http.put('/Customers/' + customer.id, customer);
    };
    CustomerService.prototype.destroy = function (id) {
        return this._http.delete('/Customers/' + id);
    };
    CustomerService.prototype.destroyMultiple = function (customers, username) {
        var customersId = [];
        for (var _i = 0, customers_1 = customers; _i < customers_1.length; _i++) {
            var customer = customers_1[_i];
            customersId.push(customer.id);
        }
        return this._http.patch('/company/' + username + '/Customers/delete', customersId);
    };
    CustomerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;


/***/ }),

/***/ "./src/app/_services/invoice.service.ts":
/*!**********************************************!*\
  !*** ./src/app/_services/invoice.service.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app/_services/app.service.ts");
var InvoiceService = /** @class */ (function () {
    function InvoiceService(_http, _appService) {
        this._http = _http;
        this._appService = _appService;
        this._currentUser = _appService.getCurrentUser();
    }
    InvoiceService.prototype.companyInvoices = function () {
        return this._http.get("/company/" + this._currentUser.companyId + "/invoices");
    };
    InvoiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], InvoiceService);
    return InvoiceService;
}());
exports.InvoiceService = InvoiceService;


/***/ }),

/***/ "./src/app/_validators/EmailValidator.ts":
/*!***********************************************!*\
  !*** ./src/app/_validators/EmailValidator.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EmailValidator = /** @class */ (function () {
    function EmailValidator() {
    }
    EmailValidator.emailValidator = function () {
        return function (c) {
            var isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(c.value);
            if (isValid) {
                return null;
            }
            else {
                return {
                    emailvalidator: {
                        valid: false
                    }
                };
            }
        };
    };
    EmailValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;


/***/ }),

/***/ "./src/app/_validators/index.ts":
/*!**************************************!*\
  !*** ./src/app/_validators/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EmailValidator_1 = __webpack_require__(/*! ./EmailValidator */ "./src/app/_validators/EmailValidator.ts");
exports.EmailValidator = EmailValidator_1.EmailValidator;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var auth_guard_1 = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
var auth_component_1 = __webpack_require__(/*! ./_layout/auth.component */ "./src/app/_layout/auth.component.ts");
var index_component_1 = __webpack_require__(/*! ./_layout/index.component */ "./src/app/_layout/index.component.ts");
var auth_login_component_1 = __webpack_require__(/*! ./auth/login/auth.login.component */ "./src/app/auth/login/auth.login.component.ts");
var recover_password_component_1 = __webpack_require__(/*! ./auth/recover-password/recover-password.component */ "./src/app/auth/recover-password/recover-password.component.ts");
var company_customers_component_1 = __webpack_require__(/*! ./customers/company-customers/company-customers.component */ "./src/app/customers/company-customers/company-customers.component.ts");
var dashboard_component_1 = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
var company_invoices_component_1 = __webpack_require__(/*! ./invoices/company-invoices/company-invoices.component */ "./src/app/invoices/company-invoices/company-invoices.component.ts");
var single_invoice_component_1 = __webpack_require__(/*! ./invoices/single-invoice/single-invoice.component */ "./src/app/invoices/single-invoice/single-invoice.component.ts");
var selective_preloading_strategy_service_1 = __webpack_require__(/*! ./selective-preloading-strategy.service */ "./src/app/selective-preloading-strategy.service.ts");
var appRoutes = [
    {
        path: '',
        component: index_component_1.IndexComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: '',
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: 'customers',
                component: company_customers_component_1.CompanyCustomersComponent
            },
            {
                path: 'invoices',
                children: [
                    {
                        path: '',
                        component: company_invoices_component_1.CompanyInvoicesComponent
                    },
                    {
                        path: ':id',
                        component: single_invoice_component_1.SingleInvoiceComponent
                    }
                ]
            }
        ]
    },
    {
        path: '',
        component: auth_component_1.AuthComponent,
        children: [
            {
                path: 'login',
                component: auth_login_component_1.AuthLoginComponent
            },
            {
                path: 'forgotPassword',
                component: recover_password_component_1.RecoverPasswordComponent
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes, {
                    enableTracing: false,
                    preloadingStrategy: selective_preloading_strategy_service_1.SelectivePreloadingStrategyService
                })
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: "\n    <router-outlet></router-outlet>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular
var platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var animations_1 = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
var ng_bootstrap_1 = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
// Routes
var ngx_datatable_1 = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
var app_routing_module_1 = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
var AuthInterceptor_1 = __webpack_require__(/*! ./_etc/AuthInterceptor */ "./src/app/_etc/AuthInterceptor.ts");
var app_component_1 = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var auth_login_component_1 = __webpack_require__(/*! ./auth/login/auth.login.component */ "./src/app/auth/login/auth.login.component.ts");
var topbar_component_1 = __webpack_require__(/*! ./_layout/topbar/topbar.component */ "./src/app/_layout/topbar/topbar.component.ts");
var sidebar_component_1 = __webpack_require__(/*! ./_layout/sidebar/sidebar.component */ "./src/app/_layout/sidebar/sidebar.component.ts");
var outsideClick_directive_1 = __webpack_require__(/*! ./_directives/outsideClick.directive */ "./src/app/_directives/outsideClick.directive.ts");
var dashboard_component_1 = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var auth_component_1 = __webpack_require__(/*! ./_layout/auth.component */ "./src/app/_layout/auth.component.ts");
var index_component_1 = __webpack_require__(/*! ./_layout/index.component */ "./src/app/_layout/index.component.ts");
var recover_password_component_1 = __webpack_require__(/*! ./auth/recover-password/recover-password.component */ "./src/app/auth/recover-password/recover-password.component.ts");
var company_customers_component_1 = __webpack_require__(/*! ./customers/company-customers/company-customers.component */ "./src/app/customers/company-customers/company-customers.component.ts");
var company_invoices_component_1 = __webpack_require__(/*! ./invoices/company-invoices/company-invoices.component */ "./src/app/invoices/company-invoices/company-invoices.component.ts");
var single_invoice_component_1 = __webpack_require__(/*! ./invoices/single-invoice/single-invoice.component */ "./src/app/invoices/single-invoice/single-invoice.component.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                auth_login_component_1.AuthLoginComponent,
                topbar_component_1.TopbarComponent,
                sidebar_component_1.SidebarComponent,
                outsideClick_directive_1.OutsideClickDirective,
                dashboard_component_1.DashboardComponent,
                auth_component_1.AuthComponent,
                index_component_1.IndexComponent,
                recover_password_component_1.RecoverPasswordComponent,
                company_customers_component_1.CompanyCustomersComponent,
                company_invoices_component_1.CompanyInvoicesComponent,
                single_invoice_component_1.SingleInvoiceComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                ngx_datatable_1.NgxDatatableModule,
                ng_bootstrap_1.NgbDropdownModule,
                app_routing_module_1.AppRoutingModule
                // InvoicesModule
            ],
            providers: [AuthInterceptor_1.AuthInterceptorProvider],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/auth/login/auth.login.component.html":
/*!******************************************************!*\
  !*** ./src/app/auth/login/auth.login.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-login align-self-center animated bounceInDown\">\n  <div id=\"formContent\">\n    <div id=\"loginForm\" *ngIf=\"loginPage\">\n      <!-- Icon -->\n      <div class=\"fadeIn first\">\n        <i class=\"fa fa-car\"></i>\n        <h2>Autoshop</h2>\n      </div>\n\n      <!-- Login Form -->\n      <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n        <input\n          formControlName=\"email\"\n          type=\"text\"\n          placeholder=\"Email\"\n          [ngClass]=\"{ 'animated shake': f.email.touched && f.email.errors }\"\n        >\n        <input\n          formControlName=\"password\"\n          type=\"password\"\n          placeholder=\"Password\"\n          [ngClass]=\"{ 'animated shake': f.password.touched && f.password.errors }\"\n        >\n        <div class=\"errorMessage text-danger\" [ngClass]=\"{'visible': error}\">Wrong email or password.</div>\n        <input [disabled]=\"!form.valid\" type=\"submit\" value=\"Sign In\">\n      </form>\n\n      <!-- Remind Password -->\n      <div id=\"formFooter\">\n        <button class=\"btn btn-link\" (click)=\"loginPage = !loginPage\">Forgot Password?</button>\n      </div>\n    </div>\n    <div id=\"recoverPassword\" *ngIf=\"!loginPage\">\n      <div class=\"panel-body\">\n        <div class=\"text-center\">\n          <h3><i class=\"fa fa-lock fa-4x\"></i></h3>\n          <h2 class=\"text-center\" style=\"margin-top: 15px\">Forgot Password?</h2>\n          <p>We'll send you a security code to confirm your email.</p>\n          <div class=\"panel-body\">\n\n            <form class=\"form\">\n              <input type=\"text\" placeholder=\"Email Address\" >\n              <input value=\"Send code\" type=\"submit\">\n            </form>\n\n          </div>\n      <button class=\"btn btn-link\" (click)=\"loginPage = !loginPage\"><< Login</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/auth/login/auth.login.component.scss":
/*!******************************************************!*\
  !*** ./src/app/auth/login/auth.login.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-login {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-pack: center;\n      justify-content: center;\n  width: 100%;\n  min-height: 100%;\n  padding: 20px;\n  /* FORM TYPOGRAPHY*/\n}\n.app-login h2 {\n  text-align: center;\n  font-size: 16px;\n  font-weight: 600;\n  text-transform: uppercase;\n  display: inline-block;\n  margin: 40px 8px 10px 8px;\n  color: #cccccc;\n}\n.app-login *:focus {\n  outline: none;\n}\n.app-login #icon {\n  width: 60%;\n}\n.app-login #formContent {\n  border-radius: 10px 10px 10px 10px;\n  background: #fff;\n  padding: 30px;\n  width: 90%;\n  max-width: 450px;\n  position: relative;\n  padding: 0px;\n  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);\n  text-align: center;\n}\n.app-login #formFooter {\n  background-color: #f6f6f6;\n  border-top: 1px solid #dce8f1;\n  padding: 25px;\n  text-align: center;\n  border-radius: 0 0 10px 10px;\n}\n.app-login .errorMessage {\n  visibility: hidden;\n}\n.app-login input[type=button], .app-login input[type=submit], .app-login input[type=reset] {\n  background-color: #56baed;\n  border: none;\n  color: white;\n  padding: 15px 80px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  text-transform: uppercase;\n  font-size: 13px;\n  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);\n  border-radius: 5px 5px 5px 5px;\n  margin: 5px 20px 40px 20px;\n  transition: all 0.3s ease-in-out;\n}\n.app-login input[type=submit]:hover {\n  background-color: #39ace7;\n}\n.app-login input[type=submit]:disabled:hover {\n  background-color: #56baed;\n  cursor: not-allowed;\n}\n.app-login input[type=button]:active, .app-login input[type=submit]:active, .app-login input[type=reset]:active {\n  -webkit-transform: scale(0.95);\n  -ms-transform: scale(0.95);\n  transform: scale(0.95);\n}\n.app-login input[type=text],\n.app-login input[type=password] {\n  background-color: #f6f6f6;\n  color: #0d0d0d;\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin: 5px;\n  width: 85%;\n  border: 2px solid #f6f6f6;\n  transition: all 0.5s ease-in-out;\n  border-radius: 5px 5px 5px 5px;\n}\n.app-login input[type=text]:focus,\n.app-login input[type=password]:focus {\n  background-color: #fff;\n  border-bottom: 2px solid #5fbae9;\n}\n.app-login input[type=text]::-webkit-input-placeholder,\n.app-login input[type=password]::-webkit-input-placeholder {\n  color: #cccccc;\n}\n.app-login input[type=text]:-ms-input-placeholder,\n.app-login input[type=password]:-ms-input-placeholder {\n  color: #cccccc;\n}\n.app-login input[type=text]::-ms-input-placeholder,\n.app-login input[type=password]::-ms-input-placeholder {\n  color: #cccccc;\n}\n.app-login input[type=text]::placeholder,\n.app-login input[type=password]::placeholder {\n  color: #cccccc;\n}\n/* Simple CSS3 Fade-in Animation */\n.underlineHover:after {\n  display: block;\n  left: 0;\n  bottom: -10px;\n  width: 0;\n  height: 2px;\n  background-color: #56baed;\n  content: \"\";\n  transition: width 0.2s;\n}\n.underlineHover:hover {\n  color: #0d0d0d;\n  text-decoration: none;\n}\n.underlineHover:hover:after {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9sb2dpbi9DOlxceGFtcHBcXGh0ZG9jc1xcYXV0by9zcmNcXGFwcFxcYXV0aFxcbG9naW5cXGF1dGgubG9naW4uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2F1dGgvbG9naW4vYXV0aC5sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHNCQUFBO01BQUEsbUJBQUE7RUFDQSwwQkFBQTtNQUFBLHNCQUFBO0VBQ0EscUJBQUE7TUFBQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFpREEsbUJBQUE7QUMvQ0Y7QURBRTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtBQ0VKO0FEQ0U7RUFDRSxhQUFBO0FDQ0o7QURFRTtFQUNFLFVBQUE7QUNBSjtBRElFO0VBRUUsa0NBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFFQSw0Q0FBQTtFQUNBLGtCQUFBO0FDRko7QURLRTtFQUNFLHlCQUFBO0VBQ0EsNkJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFFQSw0QkFBQTtBQ0hKO0FETUU7RUFDRSxrQkFBQTtBQ0pKO0FEVUU7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFFQSxpREFBQTtFQUVBLDhCQUFBO0VBQ0EsMEJBQUE7RUFLQSxnQ0FBQTtBQ1JKO0FEV0U7RUFDRSx5QkFBQTtBQ1RKO0FEWUU7RUFDRSx5QkFBQTtFQUNBLG1CQUFBO0FDVko7QURhRTtFQUVFLDhCQUFBO0VBRUEsMEJBQUE7RUFDQSxzQkFBQTtBQ1hKO0FEY0U7O0VBRUUseUJBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtFQUtBLGdDQUFBO0VBRUEsOEJBQUE7QUNaSjtBRGVFOztFQUVFLHNCQUFBO0VBQ0EsZ0NBQUE7QUNiSjtBRGdCRTs7RUFFRSxjQUFBO0FDZEo7QURZRTs7RUFFRSxjQUFBO0FDZEo7QURZRTs7RUFFRSxjQUFBO0FDZEo7QURZRTs7RUFFRSxjQUFBO0FDZEo7QURrQkEsa0NBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSxPQUFBO0VBQ0EsYUFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7QUNmRjtBRGtCQTtFQUNFLGNBQUE7RUFDQSxxQkFBQTtBQ2ZGO0FEa0JBO0VBQ0UsV0FBQTtBQ2ZGIiwiZmlsZSI6InNyYy9hcHAvYXV0aC9sb2dpbi9hdXRoLmxvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFwcC1sb2dpbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMjBweDtcblxuICBoMiB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZGlzcGxheTppbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luOiA0MHB4IDhweCAxMHB4IDhweDtcbiAgICBjb2xvcjogI2NjY2NjYztcbiAgfVxuXG4gICo6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICAjaWNvbiB7XG4gICAgd2lkdGg6NjAlO1xuICB9XG5cblxuICAjZm9ybUNvbnRlbnQge1xuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDEwcHggMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4IDEwcHggMTBweCAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgcGFkZGluZzogMzBweDtcbiAgICB3aWR0aDogOTAlO1xuICAgIG1heC13aWR0aDogNDUwcHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmc6IDBweDtcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMzBweCA2MHB4IDAgcmdiYSgwLDAsMCwwLjMpO1xuICAgIGJveC1zaGFkb3c6IDAgMzBweCA2MHB4IDAgcmdiYSgwLDAsMCwwLjMpO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gICNmb3JtRm9vdGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGNlOGYxO1xuICAgIHBhZGRpbmc6IDI1cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xuICB9XG5cbiAgLmVycm9yTWVzc2FnZSB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB9XG5cblxuICAvKiBGT1JNIFRZUE9HUkFQSFkqL1xuXG4gIGlucHV0W3R5cGU9YnV0dG9uXSwgaW5wdXRbdHlwZT1zdWJtaXRdLCBpbnB1dFt0eXBlPXJlc2V0XSAge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM1NmJhZWQ7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBwYWRkaW5nOiAxNXB4IDgwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDEwcHggMzBweCAwIHJnYmEoOTUsMTg2LDIzMywwLjQpO1xuICAgIGJveC1zaGFkb3c6IDAgMTBweCAzMHB4IDAgcmdiYSg5NSwxODYsMjMzLDAuNCk7XG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xuICAgIG1hcmdpbjogNXB4IDIwcHggNDBweCAyMHB4O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgLW8tdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gIH1cblxuICBpbnB1dFt0eXBlPXN1Ym1pdF06aG92ZXJ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM5YWNlNztcbiAgfVxuXG4gIGlucHV0W3R5cGU9c3VibWl0XTpkaXNhYmxlZDpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzU2YmFlZDtcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICB9XG5cbiAgaW5wdXRbdHlwZT1idXR0b25dOmFjdGl2ZSwgaW5wdXRbdHlwZT1zdWJtaXRdOmFjdGl2ZSwgaW5wdXRbdHlwZT1yZXNldF06YWN0aXZlICB7XG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7XG4gIH1cblxuICBpbnB1dFt0eXBlPXRleHRdLFxuICBpbnB1dFt0eXBlPXBhc3N3b3JkXXtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xuICAgIGNvbG9yOiAjMGQwZDBkO1xuICAgIHBhZGRpbmc6IDE1cHggMzJweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbWFyZ2luOiA1cHg7XG4gICAgd2lkdGg6IDg1JTtcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjZjZmNmY2O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluLW91dDtcbiAgICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XG4gICAgLW8tdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xuICB9XG5cbiAgaW5wdXRbdHlwZT10ZXh0XTpmb2N1cyxcbiAgaW5wdXRbdHlwZT1wYXNzd29yZF06Zm9jdXN7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzVmYmFlOTtcbiAgfVxuXG4gIGlucHV0W3R5cGU9dGV4dF06OnBsYWNlaG9sZGVyLFxuICBpbnB1dFt0eXBlPXBhc3N3b3JkXTo6cGxhY2Vob2xkZXJ7XG4gICAgY29sb3I6ICNjY2NjY2M7XG4gIH1cbn1cblxuLyogU2ltcGxlIENTUzMgRmFkZS1pbiBBbmltYXRpb24gKi9cbi51bmRlcmxpbmVIb3ZlcjphZnRlciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBsZWZ0OiAwO1xuICBib3R0b206IC0xMHB4O1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1NmJhZWQ7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHRyYW5zaXRpb246IHdpZHRoIDAuMnM7XG59XG5cbi51bmRlcmxpbmVIb3Zlcjpob3ZlciB7XG4gIGNvbG9yOiAjMGQwZDBkO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi51bmRlcmxpbmVIb3Zlcjpob3ZlcjphZnRlcntcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiIsIi5hcHAtbG9naW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIC8qIEZPUk0gVFlQT0dSQVBIWSovXG59XG4uYXBwLWxvZ2luIGgyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luOiA0MHB4IDhweCAxMHB4IDhweDtcbiAgY29sb3I6ICNjY2NjY2M7XG59XG4uYXBwLWxvZ2luICo6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuLmFwcC1sb2dpbiAjaWNvbiB7XG4gIHdpZHRoOiA2MCU7XG59XG4uYXBwLWxvZ2luICNmb3JtQ29udGVudCB7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDEwcHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDEwcHggMTBweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgcGFkZGluZzogMzBweDtcbiAgd2lkdGg6IDkwJTtcbiAgbWF4LXdpZHRoOiA0NTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAwcHg7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAzMHB4IDYwcHggMCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIGJveC1zaGFkb3c6IDAgMzBweCA2MHB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYXBwLWxvZ2luICNmb3JtRm9vdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkY2U4ZjE7XG4gIHBhZGRpbmc6IDI1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xufVxuLmFwcC1sb2dpbiAuZXJyb3JNZXNzYWdlIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuLmFwcC1sb2dpbiBpbnB1dFt0eXBlPWJ1dHRvbl0sIC5hcHAtbG9naW4gaW5wdXRbdHlwZT1zdWJtaXRdLCAuYXBwLWxvZ2luIGlucHV0W3R5cGU9cmVzZXRdIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU2YmFlZDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDE1cHggODBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiAxM3B4O1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMTBweCAzMHB4IDAgcmdiYSg5NSwgMTg2LCAyMzMsIDAuNCk7XG4gIGJveC1zaGFkb3c6IDAgMTBweCAzMHB4IDAgcmdiYSg5NSwgMTg2LCAyMzMsIDAuNCk7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xuICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XG4gIG1hcmdpbjogNXB4IDIwcHggNDBweCAyMHB4O1xuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xuICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xuICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gIC1vLXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbn1cbi5hcHAtbG9naW4gaW5wdXRbdHlwZT1zdWJtaXRdOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM5YWNlNztcbn1cbi5hcHAtbG9naW4gaW5wdXRbdHlwZT1zdWJtaXRdOmRpc2FibGVkOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU2YmFlZDtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hcHAtbG9naW4gaW5wdXRbdHlwZT1idXR0b25dOmFjdGl2ZSwgLmFwcC1sb2dpbiBpbnB1dFt0eXBlPXN1Ym1pdF06YWN0aXZlLCAuYXBwLWxvZ2luIGlucHV0W3R5cGU9cmVzZXRdOmFjdGl2ZSB7XG4gIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuICAtby10cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbn1cbi5hcHAtbG9naW4gaW5wdXRbdHlwZT10ZXh0XSxcbi5hcHAtbG9naW4gaW5wdXRbdHlwZT1wYXNzd29yZF0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xuICBjb2xvcjogIzBkMGQwZDtcbiAgcGFkZGluZzogMTVweCAzMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IDE2cHg7XG4gIG1hcmdpbjogNXB4O1xuICB3aWR0aDogODUlO1xuICBib3JkZXI6IDJweCBzb2xpZCAjZjZmNmY2O1xuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xuICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xuICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XG4gIC1vLXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluLW91dDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweCA1cHggNXB4IDVweDtcbn1cbi5hcHAtbG9naW4gaW5wdXRbdHlwZT10ZXh0XTpmb2N1cyxcbi5hcHAtbG9naW4gaW5wdXRbdHlwZT1wYXNzd29yZF06Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzVmYmFlOTtcbn1cbi5hcHAtbG9naW4gaW5wdXRbdHlwZT10ZXh0XTo6cGxhY2Vob2xkZXIsXG4uYXBwLWxvZ2luIGlucHV0W3R5cGU9cGFzc3dvcmRdOjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiAjY2NjY2NjO1xufVxuXG4vKiBTaW1wbGUgQ1NTMyBGYWRlLWluIEFuaW1hdGlvbiAqL1xuLnVuZGVybGluZUhvdmVyOmFmdGVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogLTEwcHg7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU2YmFlZDtcbiAgY29udGVudDogXCJcIjtcbiAgdHJhbnNpdGlvbjogd2lkdGggMC4ycztcbn1cblxuLnVuZGVybGluZUhvdmVyOmhvdmVyIHtcbiAgY29sb3I6ICMwZDBkMGQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLnVuZGVybGluZUhvdmVyOmhvdmVyOmFmdGVyIHtcbiAgd2lkdGg6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/auth/login/auth.login.component.ts":
/*!****************************************************!*\
  !*** ./src/app/auth/login/auth.login.component.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var auth_service_1 = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var _validators_1 = __webpack_require__(/*! ../../_validators */ "./src/app/_validators/index.ts");
var User_1 = __webpack_require__(/*! ../../_models/User */ "./src/app/_models/User.ts");
var app_service_1 = __webpack_require__(/*! ../../_services/app.service */ "./src/app/_services/app.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var AuthLoginComponent = /** @class */ (function () {
    function AuthLoginComponent(fb, authService, appService, router) {
        this.fb = fb;
        this.authService = authService;
        this.appService = appService;
        this.router = router;
        this.error = false;
        this.loginPage = true;
        var user = appService.getCurrentUser();
        if (user) {
            this.router.navigate(['/']);
        }
    }
    AuthLoginComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            email: ['', [forms_1.Validators.required, _validators_1.EmailValidator]],
            password: ['', forms_1.Validators.required]
        });
    };
    Object.defineProperty(AuthLoginComponent.prototype, "f", {
        get: function () { return this.form.controls; },
        enumerable: true,
        configurable: true
    });
    AuthLoginComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            var input = this.form.value;
            this.authService.authenticate(input.email, input.password)
                .subscribe(function (user) {
                var currentUser = new User_1.User(user, true);
                console.log(currentUser);
                _this.appService.setCurrentUser(currentUser);
                _this.router.navigate(['/']);
            }, function (error) {
                _this.error = true;
            });
        }
    };
    AuthLoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__(/*! ./auth.login.component.html */ "./src/app/auth/login/auth.login.component.html"),
            styles: [__webpack_require__(/*! ./auth.login.component.scss */ "./src/app/auth/login/auth.login.component.scss")]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            auth_service_1.AuthService,
            app_service_1.AppService,
            router_1.Router])
    ], AuthLoginComponent);
    return AuthLoginComponent;
}());
exports.AuthLoginComponent = AuthLoginComponent;


/***/ }),

/***/ "./src/app/auth/recover-password/recover-password.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/auth/recover-password/recover-password.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvcmVjb3Zlci1wYXNzd29yZC9yZWNvdmVyLXBhc3N3b3JkLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/auth/recover-password/recover-password.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/auth/recover-password/recover-password.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  recover-password works!\n</p>\n"

/***/ }),

/***/ "./src/app/auth/recover-password/recover-password.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/auth/recover-password/recover-password.component.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var RecoverPasswordComponent = /** @class */ (function () {
    function RecoverPasswordComponent() {
    }
    RecoverPasswordComponent.prototype.ngOnInit = function () {
    };
    RecoverPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-recover-password',
            template: __webpack_require__(/*! ./recover-password.component.html */ "./src/app/auth/recover-password/recover-password.component.html"),
            styles: [__webpack_require__(/*! ./recover-password.component.css */ "./src/app/auth/recover-password/recover-password.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], RecoverPasswordComponent);
    return RecoverPasswordComponent;
}());
exports.RecoverPasswordComponent = RecoverPasswordComponent;


/***/ }),

/***/ "./src/app/customers/company-customers/company-customers.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/customers/company-customers/company-customers.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2N1c3RvbWVycy9jb21wYW55LWN1c3RvbWVycy9jb21wYW55LWN1c3RvbWVycy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/customers/company-customers/company-customers.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/customers/company-customers/company-customers.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-component-wrapper\" *ngIf=\"!isLoading\">\n<div class=\"content-header\">\n  <h1 class=\"content-header-title\">\n    Customers\n  </h1>\n  <nav aria-label=\"breadcrumb\">\n    <ol class=\"breadcrumb\">\n      <li class=\"breadcrumb-item\">\n        <a routerLink=\"/\">Autoshop</a>\n      </li>\n      <li class=\"breadcrumb-item active\">Customers</li>\n    </ol>\n  </nav>\n</div>\n<div class=\"row\">\n  <div class=\"col-12 dataTables-wrapper\">\n\n    <div class=\"card\">\n\n      <div class=\"card-header\">\n        <h5 class=\"card-title\">Customers</h5>\n        <small class=\"card-subtitle text-muted\">Click on a customer to view details, or select multiple to delete.\n        </small>\n      </div>\n\n      <div class=\"card-body\">\n\n        <div class=\"row\">\n          <div class=\"col-sm-12 col-md-6\">\n            <div class=\"dataTables_length\" id=\"datatables-basic_length\">\n              <label>\n                Show\n                <select [(ngModel)]=\"limit\" name=\"datatables-basic_length\" aria-controls=\"datatables-basic\" class=\"custom-select custom-select-sm form-control form-control-sm\">\n                  <option [value]=\"10\" selected>10</option>\n                  <option [value]=\"25\">25</option>\n                  <option [value]=\"50\">50</option>\n<!--                    <option ngValue=\"100\">100</option>-->\n                </select>\n                entries\n              </label>\n            </div>\n          </div>\n          <div class=\"col-sm-12 col-md-6\">\n            <div id=\"datatables-basic_filter\" class=\"dataTables_filter\">\n              <label>Search:\n                <input (keyup)=\"updateFilter($event)\" type=\"search\" class=\"form-control form-control-sm\" placeholder=\"search by name..\">\n              </label>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-sm-12\">\n\n            <ngx-datatable\n              #table\n              class='material'\n              [columns]=\"columns\"\n              [columnMode]=\"'force'\"\n              [headerHeight]=\"50\"\n              [footerHeight]=\"50\"\n              [rowHeight]=\"'auto'\"\n              [limit]=\"limit\"\n              [rows]='rows'>\n              [selected]=\"selected\"\n              [selectionType]=\"'checkbox'\"\n              (activate)=\"onActivate($event)\"\n              (select)='onSelect($event)'>\n\n              <ngx-datatable-column [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\" [draggable]=\"false\" [resizeable]=\"false\">\n                <ng-template ngx-datatable-header-template let-value=\"value\" let-allRowsSelected=\"allRowsSelected\" let-selectFn=\"selectFn\">\n                  <input type=\"checkbox\" [checked]=\"allRowsSelected\" (change)=\"selectFn(!allRowsSelected)\"/>\n                </ng-template>\n                <ng-template ngx-datatable-cell-template let-value=\"value\" let-isSelected=\"isSelected\" let-onCheckboxChangeFn=\"onCheckboxChangeFn\">\n                  <input type=\"checkbox\" [checked]=\"isSelected\" (change)=\"onCheckboxChangeFn($event)\"/>\n                </ng-template>\n              </ngx-datatable-column>\n              <ngx-datatable-column name=\"Name\"></ngx-datatable-column>\n              <ngx-datatable-column name=\"Email\"></ngx-datatable-column>\n              <ngx-datatable-column name=\"Phone\"></ngx-datatable-column>\n              <ngx-datatable-column name=\"last visit\">\n                <ng-template let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n                  {{value | date: 'mediumDate'}}\n                </ng-template>\n              </ngx-datatable-column>\n\n<!--              <ngx-datatable-footer>-->\n<!--                <ng-template-->\n<!--                  ngx-datatable-footer-template-->\n<!--                  let-rowCount=\"rowCount\"-->\n<!--                  let-pageSize=\"pageSize\"-->\n<!--                  let-selectedCount=\"selectedCount\"-->\n<!--                  let-curPage=\"curPage\"-->\n<!--                  let-offset=\"offset\">-->\n<!--                  <div style=\"padding: 5px 10px\">-->\n<!--                    <hr style=\"width:100%\" />-->\n<!--                    <div>-->\n<!--                      Rows: {{rowCount}} |-->\n<!--                      Size: {{pageSize}} |-->\n<!--                      Current: {{curPage}} |-->\n<!--                      Offset: {{offset}}-->\n<!--                    </div>-->\n<!--                  </div>-->\n<!--                </ng-template>-->\n<!--              </ngx-datatable-footer>-->\n            </ngx-datatable>\n<!--            <table class=\"table table-striped\">-->\n<!--              <thead>-->\n<!--              <tr>-->\n<!--                <th scope=\"col\"><input type=\"checkbox\" /></th>-->\n<!--                <th scope=\"col\">Name</th>-->\n<!--                <th scope=\"col\">Phone</th>-->\n<!--                <th scope=\"col\">Email</th>-->\n<!--                <th scope=\"col\">Last visit</th>-->\n<!--              </tr>-->\n<!--              </thead>-->\n<!--              <tbody>-->\n            <!--              <tr *ngFor=\"let customer of Customers$ | async\">-->\n<!--                <th scope=\"row\"><input type=\"checkbox\" /></th>-->\n<!--                <td>{{ customer.firstName }}</td>-->\n<!--                <td>{{ customer.phone }}</td>-->\n<!--                <td>{{ customer.email }}</td>-->\n<!--                <td>{{ customer.lastVisit | date:'longDate'}}</td>-->\n<!--              </tr>-->\n<!--              </tbody>-->\n<!--            </table>-->\n          </div>\n        </div>\n\n<!--        <div class=\"row\">-->\n<!--          <div class=\"col-sm-12 col-md-5\">-->\n<!--            <div class=\"dataTables_info\"s role=\"status\" aria-live=\"polite\">-->\n<!--              Showing 1 to 10 of 57 entries-->\n<!--            </div>-->\n<!--          </div>-->\n<!--          <div class=\"col-sm-12 col-md-7\">-->\n<!--            <div class=\"dataTables_paginate paging_simple_numbers\">-->\n<!--              <ul class=\"pagination\">-->\n<!--                <li class=\"paginate_button page-item previous disabled\" id=\"datatables-buttons_previous\">-->\n<!--                  <a href=\"#\" aria-controls=\"datatables-buttons\" data-dt-idx=\"0\" tabindex=\"0\" class=\"page-link\">Previous</a>-->\n<!--                </li>-->\n<!--                <li class=\"paginate_button page-item active\">-->\n<!--                  <a href=\"#\" aria-controls=\"datatables-buttons\" data-dt-idx=\"1\" tabindex=\"0\" class=\"page-link\">1</a>-->\n<!--                </li>-->\n<!--                <li class=\"paginate_button page-item \">-->\n<!--                  <a href=\"#\" aria-controls=\"datatables-buttons\" data-dt-idx=\"2\" tabindex=\"0\" class=\"page-link\">2</a>-->\n<!--                </li>-->\n<!--                <li class=\"paginate_button page-item \">-->\n<!--                  <a href=\"#\" aria-controls=\"datatables-buttons\" data-dt-idx=\"3\" tabindex=\"0\" class=\"page-link\">3</a></li>-->\n<!--                <li class=\"paginate_button page-item next\" id=\"datatables-buttons_next\">-->\n<!--                  <a href=\"#\" aria-controls=\"datatables-buttons\" data-dt-idx=\"7\" tabindex=\"0\" class=\"page-link\">Next</a>-->\n<!--                </li>-->\n<!--              </ul>-->\n<!--            </div>-->\n<!--          </div>-->\n<!--        </div>-->\n      </div>\n\n    </div>\n  </div>\n</div>\n</div>\n"

/***/ }),

/***/ "./src/app/customers/company-customers/company-customers.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/customers/company-customers/company-customers.component.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var ngx_datatable_1 = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
var Customer_1 = __webpack_require__(/*! ../../_models/Customer */ "./src/app/_models/Customer.ts");
var app_service_1 = __webpack_require__(/*! ../../_services/app.service */ "./src/app/_services/app.service.ts");
var customer_service_1 = __webpack_require__(/*! ../../_services/customer.service */ "./src/app/_services/customer.service.ts");
var CompanyCustomersComponent = /** @class */ (function () {
    function CompanyCustomersComponent(_customerService, _appService) {
        var _this = this;
        this._customerService = _customerService;
        this._appService = _appService;
        this.columns = [
            { prop: 'firstName' },
            { name: 'Email' },
            { name: 'Phone' },
            { name: 'Last visit' }
        ];
        this.isLoading = true;
        this.limit = 10;
        this.temp = [];
        this.selected = [];
        _customerService.companyCustomers()
            .subscribe(function (customers) {
            var customerArr = [];
            for (var _i = 0, customers_1 = customers; _i < customers_1.length; _i++) {
                var customer = customers_1[_i];
                customerArr.push(new Customer_1.Customer(customer, true));
            }
            _this.rows = customerArr;
            _this.temp = customerArr.slice();
            _this.isLoading = false;
            _this._appService.toggleLoading(false);
        });
    }
    CompanyCustomersComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        this.rows = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    };
    CompanyCustomersComponent.prototype.onSelect = function (_a) {
        var selected = _a.selected;
        var _b;
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        (_b = this.selected).push.apply(_b, selected);
    };
    CompanyCustomersComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.ViewChild(ngx_datatable_1.DatatableComponent),
        __metadata("design:type", ngx_datatable_1.DatatableComponent)
    ], CompanyCustomersComponent.prototype, "table", void 0);
    CompanyCustomersComponent = __decorate([
        core_1.Component({
            selector: 'app-company-customers',
            template: __webpack_require__(/*! ./company-customers.component.html */ "./src/app/customers/company-customers/company-customers.component.html"),
            styles: [__webpack_require__(/*! ./company-customers.component.css */ "./src/app/customers/company-customers/company-customers.component.css")]
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, app_service_1.AppService])
    ], CompanyCustomersComponent);
    return CompanyCustomersComponent;
}());
exports.CompanyCustomersComponent = CompanyCustomersComponent;


/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-component-wrapper dashboard-wrapper\">\n\n  <div class=\"content-header\">\n    <h1 class=\"content-header-title\">\n      Dashboard\n    </h1>\n    <nav aria-label=\"breadcrumb\">\n      <ol class=\"breadcrumb\">\n        <li class=\"breadcrumb-item\">\n          <a routerLink=\"/\">Autoshop</a>\n        </li>\n        <li class=\"breadcrumb-item active\">Dashboard</li>\n      </ol>\n    </nav>\n  </div>\n\n  <div class=\"row\">\n\n    <div class=\"col-xl-7\">\n      <div class=\"card flex-fill w-100\">\n        <div class=\"card-header\">\n          <div class=\"card-actions float-right\">\n            <div class=\"dropdown show\">\n              <a data-display=\"static\" data-toggle=\"dropdown\" href=\"#\">\n                <svg class=\"feather feather-more-horizontal align-middle\" fill=\"none\" height=\"24\" stroke=\"currentColor\"\n                     stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\" width=\"24\"\n                     xmlns=\"http://www.w3.org/2000/svg\">\n                  <circle cx=\"12\" cy=\"12\" r=\"1\"></circle>\n                  <circle cx=\"19\" cy=\"12\" r=\"1\"></circle>\n                  <circle cx=\"5\" cy=\"12\" r=\"1\"></circle>\n                </svg>\n              </a>\n\n              <div class=\"dropdown-menu dropdown-menu-right\">\n                <a class=\"dropdown-item\" href=\"#\">Action</a>\n                <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n              </div>\n            </div>\n          </div>\n          <h5 class=\"card-title mb-0\">Recent Movement</h5>\n        </div>\n        <div class=\"card-body py-3\">\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-xl-5 d-flex\">\n      <div class=\"w-100\">\n        <div class=\"row\">\n          <div class=\"col-sm-6\">\n            <div class=\"card dashboard-card flex-fill bg-primary text-white\">\n              <div class=\"card-header\">\n                <h5 class=\"card-title text-white mb-0\">Sales Today</h5>\n              </div>\n              <div class=\"card-body py-3\">\n                <div class=\"row no-gutters\">\n                  <div class=\"col-4 align-self-center text-left\">\n                    <div class=\"icon icon-primary\">\n                      <svg class=\"feather feather-truck align-middle\" fill=\"none\" height=\"24\" stroke=\"currentColor\"\n                           stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"\n                           width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect height=\"13\" width=\"15\" x=\"1\" y=\"3\"></rect>\n                        <polygon points=\"16 8 20 8 23 11 23 16 16 16 16 8\"></polygon>\n                        <circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"></circle>\n                        <circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"></circle>\n                      </svg>\n                    </div>\n                  </div>\n                  <div class=\"col-8 align-self-center text-right\">\n                    <p class=\"text-white mb-1\">Sales Today</p>\n                    <h2 class=\"text-white\">2562</h2>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"card dashboard-card flex-fill bg-danger text-white\">\n              <div class=\"card-header\">\n                <h5 class=\"card-title text-white mb-0\">Visitors Today</h5>\n              </div>\n              <div class=\"card-body py-3\">\n                <div class=\"row no-gutters\">\n                  <div class=\"col-4 align-self-center text-left\">\n                    <div class=\"icon icon-danger\">\n                      <svg class=\"feather feather-users align-middle\" fill=\"none\" height=\"24\" stroke=\"currentColor\"\n                           stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"\n                           width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n                        <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>\n                        <path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path>\n                        <path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>\n                      </svg>\n                    </div>\n                  </div>\n                  <div class=\"col-8 align-self-center text-right\">\n                    <p class=\"text-white mb-1\">Visitors Today</p>\n                    <h2 class=\"text-white\">17212</h2>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-sm-6\">\n            <div class=\"card dashboard-card flex-fill bg-success text-white\">\n              <div class=\"card-header\">\n                <h5 class=\"card-title text-white mb-0\">Total Earnings</h5>\n              </div>\n              <div class=\"card-body py-3\">\n                <div class=\"row no-gutters\">\n                  <div class=\"col-4 align-self-center text-left\">\n                    <div class=\"icon icon-success\">\n                      <svg class=\"feather feather-dollar-sign align-middle\" fill=\"none\" height=\"24\"\n                           stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                           viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <line x1=\"12\" x2=\"12\" y1=\"1\" y2=\"23\"></line>\n                        <path d=\"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"></path>\n                      </svg>\n                    </div>\n                  </div>\n                  <div class=\"col-8 align-self-center text-right\">\n                    <p class=\"text-white mb-1\">Total Earnings</p>\n                    <h2 class=\"text-white\">$24300</h2>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"card dashboard-card flex-fill bg-warning text-white\">\n              <div class=\"card-header\">\n                <h5 class=\"card-title text-white mb-0\">Pending Orders</h5>\n              </div>\n              <div class=\"card-body py-3\">\n                <div class=\"row no-gutters\">\n                  <div class=\"col-4 align-self-center text-left\">\n                    <div class=\"icon icon-warning\">\n                      <svg class=\"feather feather-shopping-cart align-middle\" fill=\"none\" height=\"24\"\n                           stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                           viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <circle cx=\"9\" cy=\"21\" r=\"1\"></circle>\n                        <circle cx=\"20\" cy=\"21\" r=\"1\"></circle>\n                        <path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"></path>\n                      </svg>\n                    </div>\n                  </div>\n                  <div class=\"col-8 align-self-center text-right\">\n                    <p class=\"text-white mb-1\">Pending Orders</p>\n                    <h2 class=\"text-white\">43</h2>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.scss":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dashboard-wrapper .dashboard-card {\n  margin-bottom: 1.5rem;\n  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.05);\n}\n.dashboard-wrapper .dashboard-card .card-header {\n  background: transparent;\n  border-bottom: none;\n}\n.dashboard-wrapper .dashboard-card .card-header .card-title {\n  font-size: 1rem;\n}\n.dashboard-wrapper .dashboard-card .card-body .no-gutters > .col, .dashboard-wrapper .dashboard-card .card-body .no-gutters > [class*=col-] {\n  padding-right: 0;\n  padding-left: 0;\n}\n.dashboard-wrapper .dashboard-card .card-body p {\n  font-size: 13px;\n}\n.dashboard-wrapper .dashboard-card .card-body h2 {\n  font-size: 24px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL0M6XFx4YW1wcFxcaHRkb2NzXFxhdXRvL3NyY1xcYXBwXFxkYXNoYm9hcmRcXGRhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLHFCQUFBO0VBQ0EsMENBQUE7QUNESjtBREdJO0VBQ0UsdUJBQUE7RUFDQSxtQkFBQTtBQ0ROO0FER007RUFDRSxlQUFBO0FDRFI7QURPTTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtBQ0xSO0FEUU07RUFDRSxlQUFBO0FDTlI7QURTTTtFQUNFLGVBQUE7QUNQUiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGFzaGJvYXJkLXdyYXBwZXIge1xuXG4gIC5kYXNoYm9hcmQtY2FyZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICAgIGJveC1zaGFkb3c6IDAgMCAycmVtIDAgcmdiYSgwLCAwLCAwLCAuMDUpO1xuXG4gICAgLmNhcmQtaGVhZGVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcblxuICAgICAgLmNhcmQtdGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmNhcmQtYm9keSB7XG5cbiAgICAgIC5uby1ndXR0ZXJzID4gLmNvbCwgLm5vLWd1dHRlcnMgPiBbY2xhc3MqPWNvbC1dIHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgfVxuXG4gICAgICBwIHtcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgfVxuXG4gICAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi5kYXNoYm9hcmQtd3JhcHBlciAuZGFzaGJvYXJkLWNhcmQge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG4gIGJveC1zaGFkb3c6IDAgMCAycmVtIDAgcmdiYSgwLCAwLCAwLCAwLjA1KTtcbn1cbi5kYXNoYm9hcmQtd3JhcHBlciAuZGFzaGJvYXJkLWNhcmQgLmNhcmQtaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7XG59XG4uZGFzaGJvYXJkLXdyYXBwZXIgLmRhc2hib2FyZC1jYXJkIC5jYXJkLWhlYWRlciAuY2FyZC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cbi5kYXNoYm9hcmQtd3JhcHBlciAuZGFzaGJvYXJkLWNhcmQgLmNhcmQtYm9keSAubm8tZ3V0dGVycyA+IC5jb2wsIC5kYXNoYm9hcmQtd3JhcHBlciAuZGFzaGJvYXJkLWNhcmQgLmNhcmQtYm9keSAubm8tZ3V0dGVycyA+IFtjbGFzcyo9Y29sLV0ge1xuICBwYWRkaW5nLXJpZ2h0OiAwO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG59XG4uZGFzaGJvYXJkLXdyYXBwZXIgLmRhc2hib2FyZC1jYXJkIC5jYXJkLWJvZHkgcCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cbi5kYXNoYm9hcmQtd3JhcHBlciAuZGFzaGJvYXJkLWNhcmQgLmNhcmQtYm9keSBoMiB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var app_service_1 = __webpack_require__(/*! ../_services/app.service */ "./src/app/_services/app.service.ts");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(_appService) {
        this._appService = _appService;
        _appService.toggleLoading(false);
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;


/***/ }),

/***/ "./src/app/invoices/company-invoices/company-invoices.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/invoices/company-invoices/company-invoices.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".invoice-status-estimate {\n  color: blue;\n}\n\n.invoice-status-pending {\n  color: red;\n}\n\n.invoice-status-cancelled {\n  color: gray;\n}\n\n.invoice-status-closed {\n  color: green;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaW52b2ljZXMvY29tcGFueS1pbnZvaWNlcy9jb21wYW55LWludm9pY2VzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxZQUFZO0FBQ2QiLCJmaWxlIjoic3JjL2FwcC9pbnZvaWNlcy9jb21wYW55LWludm9pY2VzL2NvbXBhbnktaW52b2ljZXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbnZvaWNlLXN0YXR1cy1lc3RpbWF0ZSB7XG4gIGNvbG9yOiBibHVlO1xufVxuXG4uaW52b2ljZS1zdGF0dXMtcGVuZGluZyB7XG4gIGNvbG9yOiByZWQ7XG59XG5cbi5pbnZvaWNlLXN0YXR1cy1jYW5jZWxsZWQge1xuICBjb2xvcjogZ3JheTtcbn1cblxuLmludm9pY2Utc3RhdHVzLWNsb3NlZCB7XG4gIGNvbG9yOiBncmVlbjtcbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/invoices/company-invoices/company-invoices.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/invoices/company-invoices/company-invoices.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!isLoading\" class=\"content-component-wrapper\">\n  <div class=\"content-header\">\n    <h1 class=\"content-header-title\">\n      Invoices\n    </h1>\n    <nav aria-label=\"breadcrumb\">\n      <ol class=\"breadcrumb\">\n        <li class=\"breadcrumb-item\">\n          <a routerLink=\"/\">Autoshop</a>\n        </li>\n        <li class=\"breadcrumb-item active\">Invoices</li>\n      </ol>\n    </nav>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-12 dataTables-wrapper\">\n\n      <div class=\"card\">\n\n        <div class=\"card-header\">\n          <h5 class=\"card-title\">Invoices</h5>\n          <small class=\"card-subtitle text-muted\">Click on an invoice to view details, or select multiple to delete.\n          </small>\n        </div>\n\n        <div class=\"card-body\">\n\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatables-basic_length\">\n                <label>\n                  Show\n                  <select [(ngModel)]=\"limit\" aria-controls=\"datatables-basic\"\n                          class=\"custom-select custom-select-sm form-control form-control-sm\"\n                          name=\"datatables-basic_length\">\n                    <option [value]=\"10\" selected>10</option>\n                    <option [value]=\"25\">25</option>\n                    <option [value]=\"50\">50</option>\n                    <!--                    <option ngValue=\"100\">100</option>-->\n                  </select>\n                  entries\n                </label>\n\n                <select [(ngModel)]=\"status\">\n                  <option [value]=\"false\">All Invoices</option>\n                  <option [value]=\"10\">Paid</option>\n                  <option [value]=\"20\">Outstanding</option>\n                </select>\n                <!--                <div ngbDropdown>-->\n                <!--                  <button ngbDropdownToggle>All Invoices</button>-->\n                <!--                  <div ngbDropdownMenu>-->\n                <!--                    <div ngbDropdownItem>All Invoices</div>-->\n                <!--                    <div ngbDropdownItem>Estimates</div>-->\n                <!--                    <div ngbDropdownItem>Paid</div>-->\n                <!--                    <div ngbDropdownItem>Pending Payment</div>-->\n                <!--                  </div>-->\n                <!--                </div>-->\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_filter\" id=\"datatables-basic_filter\">\n                <label>Search:\n                  <input (keyup)=\"updateFilter($event)\" class=\"form-control form-control-sm\"\n                         placeholder=\"search by name..\" type=\"search\">\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n\n              <ngx-datatable\n                #table\n                [columnMode]=\"'force'\"\n                [footerHeight]=\"50\"\n                [headerHeight]=\"50\"\n                [limit]=\"limit\"\n                [rowHeight]=\"'auto'\"\n                [rows]='rows'\n                class='material'>\n                [selected]=\"selected\"\n                [selectionType]=\"'checkbox'\"\n                (activate)=\"onActivate($event)\"\n                (select)='onSelect($event)'>\n                <ngx-datatable-column name=\"Date\" prop=\"createdAt\">\n                  <ng-template let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n                    {{ value | date:'mediumDate' }}\n                  </ng-template>\n                </ngx-datatable-column>\n                <ngx-datatable-column name=\"Name\"></ngx-datatable-column>\n                <ngx-datatable-column name=\"Number\"></ngx-datatable-column>\n                <ngx-datatable-column name=\"Vehicle\">\n                  <ng-template let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n                    {{ value.year}} {{ value.model }}\n                  </ng-template>\n                </ngx-datatable-column>\n                <ngx-datatable-column name=\"Status\">\n                  <ng-template let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n                    <div class=\"invoice-status-{{ value }}\">{{ value }}</div>\n                  </ng-template>\n                </ngx-datatable-column>\n                <ngx-datatable-column name=\"Total\">\n                  <ng-template let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n                    ${{ value }}\n                  </ng-template>\n                </ngx-datatable-column>\n              </ngx-datatable>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/invoices/company-invoices/company-invoices.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/invoices/company-invoices/company-invoices.component.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var ngx_datatable_1 = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
var Invoice_1 = __webpack_require__(/*! ../../_models/Invoice */ "./src/app/_models/Invoice.ts");
var app_service_1 = __webpack_require__(/*! ../../_services/app.service */ "./src/app/_services/app.service.ts");
var invoice_service_1 = __webpack_require__(/*! ../../_services/invoice.service */ "./src/app/_services/invoice.service.ts");
var CompanyInvoicesComponent = /** @class */ (function () {
    function CompanyInvoicesComponent(_appService, _invoiceService) {
        var _this = this;
        this._appService = _appService;
        this._invoiceService = _invoiceService;
        this.limit = 10;
        this.temp = [];
        this.selected = [];
        _invoiceService.companyInvoices().subscribe(function (invoices) {
            var invoicesArr = [];
            for (var _i = 0, invoices_1 = invoices; _i < invoices_1.length; _i++) {
                var invoice = invoices_1[_i];
                invoicesArr.push(new Invoice_1.Invoice(invoice, true));
            }
            console.log(invoicesArr);
            _this.rows = invoicesArr;
            _this.temp = invoicesArr.slice();
            _this._appService.toggleLoading(false);
        });
    }
    CompanyInvoicesComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    };
    CompanyInvoicesComponent.prototype.onSelect = function (_a) {
        var selected = _a.selected;
        var _b;
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        (_b = this.selected).push.apply(_b, selected);
    };
    CompanyInvoicesComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild(ngx_datatable_1.DatatableComponent),
        __metadata("design:type", ngx_datatable_1.DatatableComponent)
    ], CompanyInvoicesComponent.prototype, "table", void 0);
    CompanyInvoicesComponent = __decorate([
        core_1.Component({
            selector: 'app-company-invoices',
            template: __webpack_require__(/*! ./company-invoices.component.html */ "./src/app/invoices/company-invoices/company-invoices.component.html"),
            styles: [__webpack_require__(/*! ./company-invoices.component.css */ "./src/app/invoices/company-invoices/company-invoices.component.css")]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService,
            invoice_service_1.InvoiceService])
    ], CompanyInvoicesComponent);
    return CompanyInvoicesComponent;
}());
exports.CompanyInvoicesComponent = CompanyInvoicesComponent;


/***/ }),

/***/ "./src/app/invoices/single-invoice/single-invoice.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/invoices/single-invoice/single-invoice.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ludm9pY2VzL3NpbmdsZS1pbnZvaWNlL3NpbmdsZS1pbnZvaWNlLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/invoices/single-invoice/single-invoice.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/invoices/single-invoice/single-invoice.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!isLoading\" class=\"content-component-wrapper\">\n  <div class=\"content-header\">\n    <h1 class=\"content-header-title\">\n      Invoices\n    </h1>\n    <nav aria-label=\"breadcrumb\">\n      <ol class=\"breadcrumb\">\n        <li class=\"breadcrumb-item\">\n          <a routerLink=\"/\">Autoshop</a>\n        </li>\n        <li class=\"breadcrumb-item\">\n          <a routerLink=\"/invoices\">Invoices</a>\n        </li>\n        <li class=\"breadcrumb-item active\">{{ invoiceKey }}</li>\n      </ol>\n    </nav>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/invoices/single-invoice/single-invoice.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/invoices/single-invoice/single-invoice.component.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var app_service_1 = __webpack_require__(/*! ../../_services/app.service */ "./src/app/_services/app.service.ts");
var SingleInvoiceComponent = /** @class */ (function () {
    function SingleInvoiceComponent(_appService, _route) {
        this._appService = _appService;
        this._route = _route;
        _appService.toggleLoading(false);
    }
    SingleInvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.paramMap.subscribe(function (params) {
            _this.invoiceKey = params.get('id');
        });
    };
    SingleInvoiceComponent = __decorate([
        core_1.Component({
            selector: 'app-single-invoice',
            template: __webpack_require__(/*! ./single-invoice.component.html */ "./src/app/invoices/single-invoice/single-invoice.component.html"),
            styles: [__webpack_require__(/*! ./single-invoice.component.css */ "./src/app/invoices/single-invoice/single-invoice.component.css")]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, router_1.ActivatedRoute])
    ], SingleInvoiceComponent);
    return SingleInvoiceComponent;
}());
exports.SingleInvoiceComponent = SingleInvoiceComponent;


/***/ }),

/***/ "./src/app/selective-preloading-strategy.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/selective-preloading-strategy.service.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var SelectivePreloadingStrategyService = /** @class */ (function () {
    function SelectivePreloadingStrategyService() {
        this.preloadedModules = [];
    }
    SelectivePreloadingStrategyService.prototype.preload = function (route, load) {
        if (route.data && route.data['preload']) {
            // add the route path to the preloaded module array
            this.preloadedModules.push(route.path);
            // log the route path to the console
            console.log('Preloaded: ' + route.path);
            return load();
        }
        else {
            return rxjs_1.of(null);
        }
    };
    SelectivePreloadingStrategyService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SelectivePreloadingStrategyService);
    return SelectivePreloadingStrategyService;
}());
exports.SelectivePreloadingStrategyService = SelectivePreloadingStrategyService;


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false,
    apiUrl: 'http://localhost/api',
    homeUrl: 'localhost/',
    passwordStrength: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    const: {
        authToken: 'authToken',
        currentUser: 'user',
        deviceId: 'device',
        impersonate: 'impersonate'
    }
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
var environment_1 = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\auto\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map