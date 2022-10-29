import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import {NoteService} from "../services/note.service";
import {Note} from "../models/note";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteForm!:FormGroup;
  editForm!:FormGroup;

  notesData:any=[]
  noteDetails:any;
  noteObj:Note={
    id:'',
    note_title:'',
    note_desc:''
  }
  constructor(private fb:FormBuilder,private noteService:NoteService,private spinner: NgxSpinnerService ) {
    this.noteForm=this.fb.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]],
    });
    this.editForm=this.fb.group({
      edit_title:['',[Validators.required]],
      edit_description:['',[Validators.required]],
    });
  }

  ngOnInit() {
    this.getAllNotes()
  }
  addNote(){
    const{value}=this.noteForm
    console.log(value)
    this.noteObj.id= ``;
    this.noteObj.note_title=value.title;
    this.noteObj.note_desc=value.description;
    this.noteService.addNote(this.noteObj).then((note)=>{
      if(note){
        alert("note added successfully")
        this.noteForm.reset()
      }
    })
  }
  getAllNotes(){
    this.spinner.show();
   this.noteService.getNotes().subscribe((res:Note[])=>{
     console.log(res)
     this.notesData=res;
     this.spinner.hide();
    })
  }
  deleteNote(note:Note){
    let decision=confirm("Are you sure to delete Note?");
    if(decision == true){
      this.noteService.deleteNote(note);
    }

  }
getAllDetails(note:Note){
    this.noteDetails=note
}
  updateNote(note:Note) {
    const{value}=this.editForm
    console.log(value)
    console.log(note.id)
    this.noteObj.id= note.id;
    this.noteObj.note_title=value.edit_title;
    this.noteObj.note_desc=value.edit_description

    this.noteService.updateNote(note,this.noteObj).then(()=>{
      alert("Note updated successfully")
    })
    this.editForm.reset()
  }
}
