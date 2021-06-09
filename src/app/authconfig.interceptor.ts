import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // const url = window.location.hostname;
        // localStorage.setItem('host',url);
        const authToken = localStorage.getItem('token');
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken,
                // Cookie: "token=" + authToken
                // clientCode: url
            }
        });
        return next.handle(req);
    }
}