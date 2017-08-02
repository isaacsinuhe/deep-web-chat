import { DeepChatPage } from './app.po';

describe('deep-chat App', () => {
  let page: DeepChatPage;

  beforeEach(() => {
    page = new DeepChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
