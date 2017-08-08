import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideFromRightAnimation: AnimationEntryMetadata =
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            animate('0.5s ease-in')
        ]),
        transition(':leave', [
            animate('0.5s ease-in', style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }))
        ])
    ])

export const slideFromLeftAnimation: AnimationEntryMetadata =
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(100%)'
            }),
            animate('0.5s ease-in')
        ]),
        transition(':leave', [
            animate('0.5s ease-in', style({
                opacity: 0,
                transform: 'translateX(100%)'
            }))
        ])
    ])
