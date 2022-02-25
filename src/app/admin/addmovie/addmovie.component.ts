import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  addmovieForm:FormGroup

  constructor(public formBuilderObj:FormBuilder,public routerObj:Router,public userServiceObj:UserService) { }

  ngOnInit(): void {
    this.addmovieForm=this.formBuilderObj.group({
      movieName:[''],
      movieGenre:[''],
      movieRating:[''],
      movieDuration:[''],
      movieYear:[''],
      movieDescription:[''],
    })
  }

  fileName:string;
  file:File
  imageUrl:string | ArrayBuffer ="https://bulma.io/images/placeholders/480x480.png"
  uploadImage(file:File){
    this.file=file
    this.fileName = file.name

    //read file content
    const reader = new FileReader()
    reader.readAsDataURL(file)

    //onload
    reader.onload=()=>{
      this.imageUrl=reader.result
    }
  }

  onSubmit(){
    console.log(this.addmovieForm.value)
    let movieObj = this.addmovieForm.value
    let formData = new FormData
    //add movieObj
    formData.append("movieObj",JSON.stringify(movieObj))
    //add photo
    formData.append("photo",this.file)
    this.userServiceObj.addMovies(formData).subscribe({
      next:(response)=>{
        
      },
      error:(error)=>{
        console.log("Error",error.message)
      }
    })

  }

}
