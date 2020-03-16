import { AnimationController } from '@ionic/angular';
const animationCtrl = new AnimationController();

export const getIonPageElement = (element: HTMLElement) => {
  if (element.classList.contains('ion-page')) {
    return element;
  }

  const ionPage = element.querySelector(
    ':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs'
  );
  if (ionPage) {
    return ionPage;
  }
  // idk, return the original element so at least something animates and we don't have a null pointer
  return element;
};
export const fancyAnimation = (_: HTMLElement, opts: any) => {
  const backDirection = opts.direction === 'back';
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;

  const enteringPageEl = getIonPageElement(enteringEl);

  const rootTransition = animationCtrl.create();

  const enterTransition = animationCtrl.create();
  const leavingTransition = animationCtrl.create();

  leavingTransition.addElement(getIonPageElement(leavingEl)).duration(250);

  enterTransition
    .addElement(enteringPageEl)
    .duration(250)
    .fill('both')
    .beforeRemoveClass('ion-page-invisible');

  if (!backDirection) {
    enterTransition
      .beforeStyles({ border: 'thin solid black' })
      .keyframes([
        { offset: 0, transform: 'scale(0)' },
        { offset: 1, transform: 'scale(1)' }
      ])
      .afterClearStyles(['border']);

    leavingTransition.keyframes([
      { offset: 0, opacity: 1 },
      { offset: 1, opacity: 0.1 }
    ]);
  } else {
    enterTransition.keyframes([
      { offset: 0, opacity: 0.1 },
      { offset: 1, opacity: 1 }
    ]);

    leavingTransition
      .beforeStyles({ border: 'thin solid black' })
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 1, transform: 'scale(0)' }
      ])
      .afterClearStyles(['border']);
  }

  rootTransition.addAnimation([enterTransition, leavingTransition]);

  return rootTransition;
};

export const modalEnterAnimation = (baseEl: any) => {
  const backdropAnimation = animationCtrl
    .create()
    .addElement(baseEl.querySelector('ion-backdrop')!)
    .fromTo('opacity', '0.01', '0.9')
    .duration(500);

  const wrapperAnimation = animationCtrl
    .create()
    .addElement(baseEl.querySelector('.modal-wrapper')!)
    .delay(500)
    .keyframes([
      { offset: 0, opacity: '0', transform: 'scale(0)' },
      { offset: 1, opacity: '0.99', transform: 'scale(1)' }
    ])
    .duration(250);

  return animationCtrl
    .create()
    .addElement(baseEl)
    .easing('ease-out')
    .addAnimation([backdropAnimation, wrapperAnimation]);
};
export const modalLeaveAnimation = (baseEl: any) => {
  return modalEnterAnimation(baseEl).direction('reverse');
};
