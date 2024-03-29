import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NavComponent } from "../../../nav/nav.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmailTemplatesService } from '../../../services/email-templates.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

interface templateData {
  et_id: number,
  et_name: string,
  et_subject: string,
  et_data: string
}

@Component({
  selector: 'app-edit-template',
  standalone: true,
  templateUrl: './edit-template.component.html',
  styleUrl: './edit-template.component.scss',
  imports: [NavComponent, MatFormFieldModule, MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, CKEditorModule, MatButtonModule, RouterLink]
})
export class EditTemplateComponent {

  title = 'angular';
  public Editor = ClassicEditor;

  isLoading: boolean = true;
  slug: string;
  templateData!: templateData;
  isButtonDisabled: boolean = true;


  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  emailTemplateService: EmailTemplatesService = inject(EmailTemplatesService);
  httpClient: HttpClient = inject(HttpClient)

  constructor(private toastr: ToastrService,private router: Router) {
    this.slug = this.activatedRoute.snapshot.paramMap.get('name') || "";
    this.getTemplateData(this.slug);
  }

  getTemplateData(slug: string) {
    this.emailTemplateService.fetchTemplateData(slug)
      .subscribe(
        (data: any) => {
          this.templateData = data.data;
          this.isLoading = false;
          if (data) {
            this.isButtonDisabled = false;

          }
        },
        (error: any) => {
        }
      );
  }

  updateTemplate() {
    if (this.templateData.et_data == "" || this.templateData.et_subject.trim() == "") {
      this.toastr.error("Fields can't be empty")
    }
    else {

      const data = {
        subject: this.templateData.et_subject,
        body: this.templateData.et_data
      }
      this.emailTemplateService.updateTemplate(this.slug, data)
        .subscribe(
          (data: object) => {
            this.toastr.success("Template updated")
            this.router.navigate(['../../settings']);
          },
          (error: any) => {
            this.toastr.error("Error in update")
          }
        );
    }
  }

}




