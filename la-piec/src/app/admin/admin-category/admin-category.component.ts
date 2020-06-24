import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  couldCategories: Array<any> = [];
  adminCategories: Array<ICategory> = [];
  categoryID: number;
  categoryNameUA: string;
  categoryNameEN: string;
  editStatus: boolean;

  modalRef: BsModalRef;

  constructor(private catService: CategoriesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getCloudCategories();
  }

  private getCategories(): void {
    this.catService.getJSONCategories().subscribe(
      data => {
        this.adminCategories = data;
      },
      error => { console.log('Discount service', error); }
    );
  }

  public addCategory(): void {
    const category: ICategory = new Category(null, this.categoryNameUA, this.categoryNameEN);
    // if (this.adminCategories.length > 0) {
    //   category.id = this.adminCategories.slice(-1)[0].id + 1;
    // }
    this.catService.addJSONCategory(category).subscribe(
      () => {
        this.getCategories();
      }
    );
    this.resetForm();
  }

  public deleteCategory(category: ICategory): void {
    if (confirm('Yes or Not')) {
      this.catService.deleteJSONCategory(category).subscribe(
        () => {
          this.getCategories();
        }
      );
    }
  }

  public editCategory(template: TemplateRef<any>, category: ICategory): void {
    this.modalRef = this.modalService.show(template);
    this.categoryNameUA = category.nameUA;
    this.categoryNameEN = category.nameEN;
    this.categoryID = category.id;
    this.editStatus = true;
  }

  public saveEditCategory(): void {
    const editD: ICategory = new Category(this.categoryID, this.categoryNameUA, this.categoryNameEN);
    this.catService.updateJSONCategory(editD).subscribe(
      () => {
        this.getCategories();
      }
    );
    this.resetForm();
  }

  private resetForm(): void {
    this.categoryID = null;
    this.categoryNameUA = '';
    this.categoryNameEN = '';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editStatus = false;
    this.resetForm();
  }


  /* Firecloud Database */

  private getCloudCategories() {
    this.catService.getFirebaseCategories().subscribe(actions => {
      this.couldCategories = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, {id: id}, data);
      });
      console.log(this.couldCategories);
    });
  }

  /* Firecloud Database */

}