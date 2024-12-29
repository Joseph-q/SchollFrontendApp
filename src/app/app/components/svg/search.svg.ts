import { Component } from '@angular/core';

@Component({
  selector: 'search-svg',
  standalone: true,
  template: ` <svg
    width="20"
    height="20"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.8">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.94568 12.8643C12.6744 11.7047 13.9464 8.55259 12.7867 5.82396C11.627 3.09533 8.47483 1.82341 5.7461 2.98305C3.01737 4.14269 1.74541 7.29476 2.90509 10.0234C4.06477 12.752 7.21695 14.0239 9.94568 12.8643Z"
        stroke="#202224"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.6417 11.7192L15.8053 15.8833"
        stroke="#202224"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>`,
})
export class SearchSvg {}
