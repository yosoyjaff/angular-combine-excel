import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public JsonData: any[] = [];
  constructor() { }
}
