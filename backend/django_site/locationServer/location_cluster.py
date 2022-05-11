import hdbscan
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd

def cluster(data):
    raw_df = convertToDataFrame(data)
    df = pre_processing(raw_df)
    X = np.array(df[['LON','LAT']],dtype='float64')
    try:
        df['CLUSTER_HDBSCAN'] = hdbscan_cluster(X)
        centroids = kMeans_cluster(X, len(np.unique(df['CLUSTER_HDBSCAN']))-1)
    except:
        centroids = []
    return centroids

def convertToDataFrame(in_dic):
    return pd.DataFrame(in_dic)

def pre_processing(raw_df):
    print(f'Before (Nulls and Duplicates) \t:\tdf.shape = {raw_df.shape}')
    raw_df.dropna(inplace=True)
    raw_df.drop_duplicates(subset=['double_longitude','double_latitude'],keep ='first', inplace=True)
    print(f'After (Nulls and Duplicates) \t:\tdf.shape = {raw_df.shape}')
    df = raw_df[['double_longitude','double_latitude']]
    df.rename(columns = {'double_longitude':'LON', 'double_latitude':'LAT'}, inplace = True)
    return df

def kMeans_cluster(X, k):
    model = KMeans(n_clusters=k, random_state=1).fit(X)
    class_predictions = model.predict(X)
    silhouette = silhouette_score(X, class_predictions)
    
    print(f'K={k}')
    print(f'Silhouette Score: {silhouette}')

    centroids = []
    for center in model.cluster_centers_:
        centroid = [center[1], center[0]]
        centroids.append(centroid)

    print(centroids)
    return centroids

def hdbscan_cluster(X):
    best_silhouette = 0
    best_class_predictions = []
    for min_cluster_size in range(1,10):
        for min_samples in range(1, 18):
            try:    
                model=hdbscan.HDBSCAN(min_cluster_size=min_cluster_size, min_samples=min_samples, cluster_selection_epsilon=0.005)
                class_predictions = model.fit_predict(X)
                curr_silhouette = silhouette_score(X[class_predictions!=-1], class_predictions[class_predictions!=-1])

                if curr_silhouette > best_silhouette:
                    best_class_predictions = class_predictions
                    best_silhouette = curr_silhouette
            except:
                continue

    print(f'Number of clusters found: {len(np.unique(best_class_predictions))-1}')
    print(f'Number of outliers found: {len(best_class_predictions[class_predictions==-1])}')
    return best_class_predictions

def addressing_outliers(df):
    classifier=KNeighborsClassifier(n_neighbors=1)
    df_train=df[df.CLUSTER_HDBSCAN!=-1]
    df_predict=df[df.CLUSTER_HDBSCAN ==-1]
    x_train = np.array(df_train[['LON','LAT']],dtype='float64')
    y_train = np.array(df_train['CLUSTER_HDBSCAN'])
    X_predict = np.array(df_predict[['LON','LAT']],dtype='float64')
    classifier.fit(x_train,y_train)
    predictions = classifier.predict(X_predict)
    df['CLUSTER_hybrid'] = df['CLUSTER_HDBSCAN']
    df.loc[df.CLUSTER_HDBSCAN==-1,'CLUSTER_hybrid'] = predictions

    return df