jest.unmock('../../src/layo');
import Layo from '../../src/layo';
describe('Layo', () => {
  const layo = new Layo('./__tests__/support/layout.html', './__tests__/support/view.html');

  it('has a layout', () => {
    expect(layo.layout).toMatch('layout.html');
  })
  it('has a view', () => {
    expect(layo.view).toMatch('view.html');
  })

  describe('readLayout', () => {
    it('returns the contents of a file', () => {
      layo.readLayout()
        .then((layout) => {
          expect(layout).toMatch(/I'm the layout/);
      })
    });
  });

  describe('readView', () => {
    it('returns the contents of a file', () => {
      layo.readView()
        .then((layout) => {
          expect(layout).toMatch(/I'm the view/);
      })
    });
  });

  describe('render', () => {
    let layout;
    beforeEach((done) => {
      layo.render().then((data) => {
        layout = data;
        done();
      })
    });
    it('returns the files with the view inserted at {{ render }}', () => {
      expect(layout).toBe("I'm the layout\nI'm the view\n\nend layout\n");
    });
  });

})
