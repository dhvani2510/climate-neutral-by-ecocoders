import { callAPI } from '../testingjs/analyser';

describe('callAPI function', () => {
    test('fetches data from the API', async() => {
        // Mocking the fetch function
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ VehiclesList: ['vehicle1', 'vehicle2'] })
        });

        const data = await callAPI();

        expect(data).toEqual(['vehicle1', 'vehicle2']);
        expect(fetch).toHaveBeenCalledWith(
            'https://fcrapi.azurewebsites.net/VehiclesPublic',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }),
                body: expect.any(String)
            })
        );
    });
});