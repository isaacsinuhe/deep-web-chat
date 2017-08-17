import { FormGroup, ValidationErrors, FormControl } from '@angular/forms'
import { Observable } from 'rxjs/Observable'

export function equalValidator({ value }: FormGroup): { [key: string]: any } {
    const [first, ...rest] = Object.keys(value || {})
    const valid = rest.every(v => value[v] === value[first])
    return valid ? null : { equal: true }
}

export function dateRangeValidator({ value }: FormGroup) {
    const [from, to] = Object.keys(value || {})
    const fromDate = new Date(value[from])
    const toDate = new Date(value[to])
    return fromDate <= toDate ? null : { dateRange: true }
}
