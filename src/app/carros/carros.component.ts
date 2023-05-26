import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CarrosService } from '../carros.service';
import { Carros} from '../carro'

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})

  export class CarrosComponent implements OnInit {
    carros: Carros[] = [];
    isEditing : boolean = false;
    formGroupCarro: FormGroup;
    submitted: boolean = false;

    constructor(private CarroService: CarrosService, private formBuilder: FormBuilder) {
      this.formGroupCarro = formBuilder.group({
        id: [''],
        titulo: ['',[Validators.required]],
        descricao: ['',[Validators.required]],
        preco : ['',[Validators.required]],
        img: [''],
        validade: [''],
        status: [''],
      });
    }

    clean(){
      this.formGroupCarro.reset();
      this.isEditing = false;
      this.submitted = false;
    }

    save() {
      this.submitted = true;
      if (this.formGroupCarro.valid){
        if (this.isEditing){
          this.CarroService.update(this.formGroupCarro.value).subscribe({
            next: () => {
              this.loadCarros();
              this.formGroupCarro.reset();
              this.isEditing = false;
              this.submitted = false;
            }
          });

        }
        else {
          this.CarroService.save(this.formGroupCarro.value).subscribe({
            next: data => {
              this.carros.push(data);
              this.formGroupCarro.reset();
              this.submitted = false;
            }
          })
        }
      }
      }
    ngOnInit(): void {
      this.loadCarros();
    }

    loadCarros() {
      this.CarroService.getCarros().subscribe({
        next: data => this.carros = data
      });
    }

    edit(Carro: Carros) {
      this.formGroupCarro.setValue(Carro);
      this.isEditing = true;
    }

    delete(Carro: Carros) {
      this.CarroService.delete(Carro).subscribe({
        next: () => this.loadCarros()
      });
    }
    get name() : any {
      return this.formGroupCarro.get("name");
    }
    get email() : any {
      return this.formGroupCarro.get("email");
    }


  }

