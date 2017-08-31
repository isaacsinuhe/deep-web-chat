import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideFromRightAnimation: AnimationEntryMetadata =
    trigger('logAnimation', [
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
    trigger('dashAnimation', [
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
            animate('0.5s ease-in',
            style({
                opacity: 0,
                transform: 'translateX(100%)'
            }))
        ])
    ])
export const enterFromRight: AnimationEntryMetadata =
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
            animate('0.4s ease-in')
        ]),
        transition(':leave', [
            animate('0s ease-in', style({
                opacity: 1,
                position: 'absolute'
                // transform: 'translateX(-100%)'
            }))
        ])
    ])
