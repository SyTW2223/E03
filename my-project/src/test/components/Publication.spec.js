import { shallowMount, createLocalVue } from '@vue/test-utils';
import PublicationList from '../../components/Publication.vue';

describe('PublicationList', () => {
  let wrapper;
  let localVue;

  beforeEach(async () => {
    localVue = createLocalVue();
    wrapper = shallowMount(PublicationList, {
      localVue,
      mocks: {
        $route: {
          params: {
            username: 'testuser',
          },
          path: '/userProfile/testuser',
        },
        $store: {
          state: {
            auth: {
              publications: [
                {
                  username: 'user1',
                  date: '2023-06-16T10:30:00Z',
                  message: 'Publicación 1',
                  _id: '1',
                },
                {
                  username: 'user2',
                  date: '2023-06-15T14:45:00Z',
                  message: 'Publicación 2',
                  _id: '2',
                },
              ],
            },
          },
          dispatch: jest.fn(),
        },
      },
    });
    await wrapper.vm.$nextTick(); // Espera a que se resuelva el created() antes de continuar con las pruebas
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renderiza correctamente las publicaciones', async () => {
    // Espera a que se resuelva la acción `doPublications` antes de continuar con las pruebas
    await wrapper.vm.$nextTick();

    const publications = wrapper.findAll('.publication');
    expect(publications.length).toBe(wrapper.vm.publicationData.length);
    
    wrapper.vm.publicationData.forEach((publication, index) => {
      const username = publications.at(index).find('.username');
      const content = publications.at(index).find('.content');
      expect(username.text()).toBe(`@${publication.username}`);
      expect(content.text()).toBe(publication.message);
    });
    
    const deleteButton = wrapper.find('.btn-danger');
    expect(deleteButton.exists()).toBe(true);
    expect(deleteButton.isVisible()).toBe(true);
  });

});
