import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
//  shallow rendering testing
const fakeItem = {
  id: 'ABC123',
  title: 'A cool item',
  price: 5000,
  description: 'this is your cool item man',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
}

describe('<Item/>', () => {

  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    expect(PriceTag.children().text()).toBe('$50');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  })

  it('render out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const buttonList = wrapper.find('.buttonList');
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(1);
    expect(buttonList.find('AddToCart').exists()).toBe(true);
    expect(buttonList.find('DeleteItem').exists()).toBe(true);
  })
})