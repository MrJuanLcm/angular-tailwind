import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import * as toastr from 'toastr';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  correoElectronico: string = '';
  toastrMessage: string = '';
  dominio: string = ''; // Puedes asignar el dominio basado en la ubicación

  formUser = new FormGroup({
    primerNombre: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z]{1,20}$/),
    ]),
    segundoApellido: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z]{1,20}$/),
    ]),

    primerApellido: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z]{1,20}$/),
    ]),
    otrosNombres: new FormControl('', [Validators.pattern(/^[A-Z ]{1,50}$/)]),

    paisEmpleo: new FormControl(''),
    tipoidentificacion: new FormControl(''),
    numeroIdentificacion: new FormControl('', [
      Validators.pattern(/^[a-zA-Z0-9-]{1,20}$/),
    ]),
  });

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder
  ) {
    toastr.options.closeButton = false;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = false;
  }

  async ngOnInit(): Promise<void> {}

  async onSubmit() {
    const sendUser = {
      primer_apellido: this.formUser.value.primerApellido,
      segundo_apellido: this.formUser.value.segundoApellido,
      primer_nombre: this.formUser.value.primerNombre,
      otros_nombres: this.formUser.value.otrosNombres,
      pais_empleo: this.formUser.value.paisEmpleo,
      tipo_identificacion: this.formUser.value.tipoidentificacion,
      numero_identificacion: this.formUser.value.numeroIdentificacion,
      correo_electronico: this.correoElectronico,

      // area: this.formUser.value.area,
      // fecha_ingreso: this.formUser.value.fechaIngreso,
    };

    await this.userService.create(sendUser).then((response) => {
      if (response?.message === 'Exitoso') {
        this.router.navigate(['/']);
      } else {
        toastr.error('El número de identificación ya existe.');
      }
    });
  }

  // Método para generar el correo electrónico
  generarCorreoElectronico() {
    let primerNombre = this.formUser.value.primerNombre;
    let primerApellido = this.formUser.value.primerApellido;
    let paisEmpleo = this.formUser.value.paisEmpleo;

    if (primerNombre !== '' && primerApellido !== '' && paisEmpleo !== '') {
      this.correoElectronico = `${primerNombre}.${primerApellido}@${
        paisEmpleo == 'Colombia' ? 'global.com.co' : 'global.com.us'
      }`;
    }
  }
}
