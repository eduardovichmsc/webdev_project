import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Link } from '../../shared/ui/link/link';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { PATHS } from '../../core/configs/paths.config';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Link, Breadcrumbs],
  templateUrl: './contacts.html',
})
export class Contacts {
  breadcrumbs = [
    {
      name: 'Home',
      href: PATHS.HOME,
    },
    {
      name: 'Contacts',
      href: PATHS.CONTACTS,
    },
  ];

  contactForm: FormGroup;
  isSubmitted = false;

  status: FormStatus = 'idle';

  content = {
    header: {
      subtitle: 'Inquiries',
      title: 'Connect with the Studio',
      description:
        'For individual orders, requests from press and scheduling meetings in our mastery.',
    },
    contacts: {
      direct: {
        label: '01 // Direct',
        email: 'hello@simuero.com',
      },
      location: {
        label: '02 // Location',
        city: 'Almaty, Kazakhstan',
        descLine1: 'Dostyk avenue,',
        descLine2: 'Bolashak 1.',
      },
      social: {
        label: '03 // Social',
        links: [
          { name: 'Instagram', href: 'https://instagram.com/' },
          { name: 'Pinterest', href: 'https://ru.pinterest.com' },
        ],
      },
    },
    form: {
      name: { label: 'Name', placeholder: 'Your full name', errorReq: 'Required' },
      email: {
        label: 'Email',
        placeholder: 'your@email.com',
        errorReq: 'Required',
        errorInv: 'Invalid Email',
      },
      message: { label: 'Message', placeholder: 'How can we help you?', errorReq: 'Required' },
      submitBtn: 'Submit Inquiry',
      loadingBtn: 'Sending...',

      success: {
        title: 'Thank you.',
        message: 'Your inquiry has been successfully sent. We will get back to you shortly.',
        resetBtn: 'Send another message',
      },
    },
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.contactForm.valid) {
      this.status = 'loading';

      setTimeout(() => {
        console.log(this.contactForm.value);

        this.status = 'success';
        this.isSubmitted = false;
        this.contactForm.reset();
      }, 1500);
    }
  }

  resetFormState() {
    this.status = 'idle';
  }
}
