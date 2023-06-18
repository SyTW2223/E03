import { shallowMount, createLocalVue } from '@vue/test-utils';
import AllPublications from '../../components/AllPublications.vue';
import VueRouter from 'vue-router';

describe('AllPublications', () => {
  let wrapper;
  let localVue;
  let router;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);

    router = new VueRouter();

    wrapper = shallowMount(AllPublications, {
      localVue,
      router,
      mocks: {
        $store: {
          state: {
            auth: {
              user: {
                username: 'exampleUser'
              },
              allPublications: [
                {
                  username: 'user1',
                  date: '2023-06-15T10:30:00',
                  message: 'Publication 1'
                },
                {
                  username: 'user2',
                  date: '2023-06-16T12:45:00',
                  message: 'Publication 2'
                }
              ]
            }
          },
          dispatch: jest.fn()
        }
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renderiza el componente correctamente', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('muestra los datos de publicación correctamente', () => {
    const publicationElements = wrapper.findAll('.publication');
    expect(publicationElements.length).toBe(2);

    const firstPublication = publicationElements.wrappers[0];
    const secondPublication = publicationElements.wrappers[1];

    const firstUsername = firstPublication.find('.username').text();
    const firstDate = firstPublication.find('.date').text();
    const firstContent = firstPublication.find('.content').text();

    const secondUsername = secondPublication.find('.username').text();
    const secondDate = secondPublication.find('.date').text();
    const secondContent = secondPublication.find('.content').text();

    expect(firstUsername).toBe('@user1');
    expect(firstDate).toBe('15/06/2023, 11:30:00');
    expect(firstContent).toBe('Publication 1');

    expect(secondUsername).toBe('@user2');
    expect(secondDate).toBe('16/06/2023, 13:45:00');
    expect(secondContent).toBe('Publication 2');
  });

  it('Formatea la informacion correctamente', () => {
    const formattedDate = wrapper.vm.formatDate('2023-06-15T09:30:00');
    expect(formattedDate).toBe('15/06/2023, 10:30:00');
  });

  it('ordena las publicaciones por fecha en orden descendente', () => {
    const sortedPublications = wrapper.vm.sortedPublications;
    expect(sortedPublications.length).toBe(2);

    const firstPublication = sortedPublications[0];
    const secondPublication = sortedPublications[1];

    expect(firstPublication.username).toBe('user2');
    expect(firstPublication.date).toBe('2023-06-16T12:45:00');
    expect(firstPublication.message).toBe('Publication 2');

    expect(secondPublication.username).toBe('user1');
    expect(secondPublication.date).toBe('2023-06-15T10:30:00');
    expect(secondPublication.message).toBe('Publication 1');
  });
});
