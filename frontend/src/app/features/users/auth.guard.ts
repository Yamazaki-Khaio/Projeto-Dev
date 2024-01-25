// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './users.service';  // Caminho para o seu UserService

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isAuth()) {
      // Se o usuário estiver autenticado, permita o acesso
      
      return true;
    } else {
      // Redirecionar para a página de login se não estiver autenticado
      this.router.navigate(['/users/login']);
      return false;
    }
  }
}
