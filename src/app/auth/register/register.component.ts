import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    // validando formulario y valores por defecto
    nombre: ['', Validators.required ],
    email: ['', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    password2: ['', Validators.required ],
    terminos: [ , Validators.required ],
  }, {
    // validaciones personaliadas
    validators: this.passwordsIguales('password', 'password2')
  });



  constructor(
    // formularios reactivos
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  crearUsuario(): void {
    this.formSubmitted = true;
    console.log( this.registerForm.value );
    console.log( this.registerForm );
    if ( this.registerForm.invalid ) {
      return;
    }

    // Realizar el posteo

    this.usuarioService.crearUsuario( this.registerForm.value )

        .subscribe( resp => {
           console.log(resp);
          // Navegar al Dashboard
           this.router.navigateByUrl('/');

        }, (err) => {
          // Si sucede un error
           Swal.fire('Error', err.error.msg, 'error' );
        });


  }

// metodos para validaciones formulario

  campoNoValido( campo: string ): boolean {

    if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string ): any {
  //  validaciones personalizadas retornan una funcion
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }

    };
  }

}
